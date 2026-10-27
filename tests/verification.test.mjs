import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdtempSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

let child;
let port;
let origin;
let tempDir;
let logs = '';

async function freePort() {
  const server = createServer();
  await new Promise((resolveListen, reject) => server.once('error', reject).listen(0, '127.0.0.1', resolveListen));
  const address = server.address();
  await new Promise(resolveClose => server.close(resolveClose));
  return address.port;
}

async function waitForServer() {
  let lastError;
  for (let i = 0; i < 80; i++) {
    if (child.exitCode !== null) throw new Error(`Server exited early. Logs:\n${logs}`);
    try { const response = await fetch(`${origin}/api/health`); if (response.ok) return; }
    catch (error) { lastError = error; }
    await new Promise(resolveWait => setTimeout(resolveWait, 100));
  }
  throw new Error(`Server failed to start: ${lastError}\n${logs}`);
}

before(async () => {
  port = await freePort();
  origin = `http://127.0.0.1:${port}`;
  tempDir = mkdtempSync(join(tmpdir(), 'signal-verify-test-'));
  child = spawn(process.execPath, [resolve('src/server.mjs')], {
    cwd: resolve('.'),
    env: { ...process.env, SIGNAL_STUDIO_SKIP_DOTENV: 'true', PORT: String(port), BASE_URL: origin, NODE_ENV: 'development', DEV_EMAIL_MODE: 'true', RESEND_API_KEY: '', EMAIL_FROM: '', SUPABASE_URL: '', SUPABASE_SECRET_KEY: '', SUPABASE_SERVICE_ROLE_KEY: '', DATA_FILE: join(tempDir, 'app-data.json') },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  child.stdout.on('data', data => { logs += data.toString(); });
  child.stderr.on('data', data => { logs += data.toString(); });
  await waitForServer();
});

after(async () => {
  if (child && child.exitCode === null) { child.kill('SIGTERM'); await new Promise(resolveExit => child.once('exit', resolveExit)); }
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
});

test('email verification link works server-side and opens a verified session', async () => {
  const registration = await fetch(`${origin}/api/auth/register`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Verification Test', email: 'verification@example.com', password: 'TestPassword123', profileType: 'creator' })
  });
  assert.equal(registration.status, 201);
  assert.equal((await registration.json()).ok, true);

  let link;
  for (let i = 0; i < 40 && !link; i++) {
    link = logs.match(/(http:\/\/127\.0\.0\.1:\d+\/verify\?token=[^\s]+)/)?.[1];
    if (!link) await new Promise(resolveWait => setTimeout(resolveWait, 25));
  }
  assert.ok(link, `Expected dev verification link in logs. Logs:\n${logs}`);

  const verification = await fetch(link, { redirect: 'manual' });
  assert.equal(verification.status, 303);
  assert.equal(verification.headers.get('location'), '/?verified=1');
  const cookie = verification.headers.get('set-cookie')?.split(';')[0];
  assert.ok(cookie, 'Verification should set a session cookie');

  const me = await fetch(`${origin}/api/me`, { headers: { cookie } });
  assert.equal(me.status, 200);
  const body = await me.json();
  assert.equal(body.user.emailVerified, true);
  assert.equal(body.user.email, 'verification@example.com');

  const appJs = await fetch(`${origin}/assets/app.js`);
  assert.match(appJs.headers.get('cache-control') || '', /no-cache/);
});
