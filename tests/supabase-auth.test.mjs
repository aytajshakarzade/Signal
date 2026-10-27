import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import http from 'node:http';
import { mkdtempSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

let appChild;
let appPort;
let appOrigin;
let tempDir;
let appLogs = '';
let fakeSupabase;
let fakeSupabaseOrigin;
const usersById = new Map();

async function portFor(server) {
  await new Promise((ok, fail) => server.once('error', fail).listen(0, '127.0.0.1', ok));
  return server.address().port;
}
async function freePort() {
  const server = createServer();
  const port = await portFor(server);
  await new Promise(ok => server.close(ok));
  return port;
}
async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
}
async function waitForApp() {
  for (let i = 0; i < 80; i++) {
    if (appChild.exitCode !== null) throw new Error(`App server exited. Logs:\n${appLogs}`);
    try { const response = await fetch(`${appOrigin}/api/health`); if (response.ok) return; } catch {}
    await new Promise(ok => setTimeout(ok, 100));
  }
  throw new Error(`App server failed. Logs:\n${appLogs}`);
}

before(async () => {
  fakeSupabase = http.createServer(async (req, res) => {
    const send = (status, data) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(data)); };
    try {
      assert.equal(req.headers.apikey, 'sb_secret_mock_secret_123');
      const body = await readBody(req);
      const url = new URL(req.url, 'http://127.0.0.1');
      if (req.method === 'GET' && url.pathname === '/auth/v1/settings') {
        assert.equal(req.headers.authorization, undefined, 'the public settings probe needs only the apikey header');
        return send(200, { external: { email: true } });
      }
      assert.equal(req.headers.authorization, 'Bearer sb_secret_mock_secret_123', 'the direct REST client must match the official Supabase client credential headers');
      if (req.method === 'POST' && url.pathname === '/auth/v1/admin/users') {
        if (body.email === 'supabase-404@example.com') return send(404, { message: 'Auth admin route not found' });
        const user = { id: '11111111-1111-4111-8111-111111111111', email: body.email, user_metadata: body.user_metadata, email_confirmed_at: body.email_confirm ? new Date().toISOString() : null };
        usersById.set(user.id, user);
        return send(200, user);
      }
      if (req.method === 'GET' && url.pathname === '/auth/v1/admin/users') return send(200, { users: [...usersById.values()] });
      const match = url.pathname.match(/^\/auth\/v1\/admin\/users\/([^/]+)$/);
      if (req.method === 'PUT' && match) {
        const user = usersById.get(decodeURIComponent(match[1]));
        if (!user) return send(404, { message: 'User not found' });
        if (body.email_confirm === true) user.email_confirmed_at = new Date().toISOString();
        if (body.user_metadata) user.user_metadata = body.user_metadata;
        usersById.set(user.id, user);
        return send(200, user);
      }
      return send(404, { message: `Unexpected mock route ${req.method} ${url.pathname}` });
    } catch (error) { return send(500, { message: error.message }); }
  });
  const supabasePort = await portFor(fakeSupabase);
  fakeSupabaseOrigin = `http://127.0.0.1:${supabasePort}`;
  appPort = await freePort();
  appOrigin = `http://127.0.0.1:${appPort}`;
  tempDir = mkdtempSync(join(tmpdir(), 'signal-supabase-test-'));
  appChild = spawn(process.execPath, [resolve('src/server.mjs')], {
    cwd: resolve('.'),
    env: { ...process.env, SIGNAL_STUDIO_SKIP_DOTENV: 'true', PORT: String(appPort), BASE_URL: appOrigin, NODE_ENV: 'development', DEV_EMAIL_MODE: 'true', RESEND_API_KEY: '', EMAIL_FROM: '', SUPABASE_URL: fakeSupabaseOrigin, SUPABASE_SECRET_KEY: 'sb_publishable_mock_public_123', SUPABASE_SERVICE_ROLE_KEY: 'sb_secret_mock_secret_123', DATA_FILE: join(tempDir, 'app-data.json') },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  appChild.stdout.on('data', data => { appLogs += data.toString(); });
  appChild.stderr.on('data', data => { appLogs += data.toString(); });
  await waitForApp();
});

after(async () => {
  if (appChild && appChild.exitCode === null) { appChild.kill('SIGTERM'); await new Promise(ok => appChild.once('exit', ok)); }
  if (fakeSupabase) await new Promise(ok => fakeSupabase.close(ok));
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
});

test('registration provisions Supabase Auth user and email link confirms the same remote identity', async () => {
  const health = await (await fetch(`${appOrigin}/api/health`)).json();
  assert.equal(health.supabaseAuthConfigured, true);
  assert.equal(health.supabaseKeyStatus, 'secret_api_key');
  assert.equal(health.supabaseKeySource, 'SUPABASE_SERVICE_ROLE_KEY', 'private secret key must win over a publishable key even if the publishable key is under SUPABASE_SECRET_KEY');
  assert.equal(health.authStorage, 'supabase-auth+local-app-data');

  const registration = await fetch(`${appOrigin}/api/auth/register`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Supabase Test User', email: 'supabase-test@example.com', password: 'TestPassword123', profileType: 'creator' })
  });
  assert.equal(registration.status, 201, `Registration failed: ${await registration.clone().text()}`);
  assert.equal(usersById.size, 1, 'Supabase Auth user should exist immediately after registration');
  let link;
  for (let i = 0; i < 40 && !link; i++) {
    link = appLogs.match(/(http:\/\/127\.0\.0\.1:\d+\/verify\?token=[^\s]+)/)?.[1];
    if (!link) await new Promise(ok => setTimeout(ok, 25));
  }
  assert.ok(link, `No verification link found in logs. Logs:\n${appLogs}`);

  const verified = await fetch(link, { redirect: 'manual' });
  assert.equal(verified.status, 303);
  assert.equal(verified.headers.get('location'), '/?verified=1');
  const remoteUser = [...usersById.values()][0];
  assert.ok(remoteUser.email_confirmed_at, 'Remote Supabase Auth user must be confirmed when the email link is clicked');
  const cookie = verified.headers.get('set-cookie')?.split(';')[0];
  assert.ok(cookie, 'Verification should issue the app session cookie');
  const me = await fetch(`${appOrigin}/api/me`, { headers: { cookie } });
  assert.equal(me.status, 200);
  assert.equal((await me.json()).user.emailVerified, true);
});


test('registration continues with local email verification when the optional Supabase Auth user route returns 404', async () => {
  const logOffset = appLogs.length;
  const registration = await fetch(`${appOrigin}/api/auth/register`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Local Fallback User', email: 'supabase-404@example.com', password: 'TestPassword123', profileType: 'creator' })
  });
  const body = await registration.json();
  assert.equal(registration.status, 201, `Local fallback should allow registration: ${JSON.stringify(body)}`);
  assert.equal(body.ok, true);
  assert.equal(body.code, 'dev_verification_link_logged');
  assert.match(appLogs.slice(logOffset), /Supabase user creation failed \(HTTP 404/);
  assert.match(appLogs.slice(logOffset), /Continuing with local account creation/);

  let link;
  for (let i = 0; i < 40 && !link; i++) {
    link = appLogs.slice(logOffset).match(/(http:\/\/127\.0\.0\.1:\d+\/verify\?token=[^\s]+)/)?.[1];
    if (!link) await new Promise(ok => setTimeout(ok, 25));
  }
  assert.ok(link, `Expected a local verification link after Supabase 404. Logs:
${appLogs.slice(logOffset)}`);
  const verified = await fetch(link, { redirect: 'manual' });
  assert.equal(verified.status, 303);
  assert.equal(verified.headers.get('location'), '/?verified=1');
  const cookie = verified.headers.get('set-cookie')?.split(';')[0];
  assert.ok(cookie);
  const me = await fetch(`${appOrigin}/api/me`, { headers: { cookie } });
  assert.equal(me.status, 200);
  assert.equal((await me.json()).user.email, 'supabase-404@example.com');
});

test('read-only Supabase diagnostic confirms endpoint reachability without exposing keys', async () => {
  const response = await fetch(`${appOrigin}/api/diagnostics/supabase`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.reachable, true);
  assert.equal(body.providerStatus, 200);
  assert.equal(body.keyStatus, 'secret_api_key');
  assert.equal(JSON.stringify(body).includes('sb_secret_mock_secret_123'), false);
});
