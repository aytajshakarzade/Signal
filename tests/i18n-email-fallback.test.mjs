import test, { after, before } from 'node:test';
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
  for (let i = 0; i < 80; i++) {
    if (child.exitCode !== null) throw new Error(`Server exited early. Logs:\n${logs}`);
    try { if ((await fetch(`${origin}/api/health`)).ok) return; } catch { /* wait briefly for startup */ }
    await new Promise(resolveWait => setTimeout(resolveWait, 100));
  }
  throw new Error(`Server failed to start. Logs:\n${logs}`);
}

before(async () => {
  port = await freePort();
  origin = `http://127.0.0.1:${port}`;
  tempDir = mkdtempSync(join(tmpdir(), 'signal-studio-dev-email-'));
  child = spawn(process.execPath, [resolve('src/server.mjs')], {
    cwd: resolve('.'),
    env: {
      ...process.env,
      SIGNAL_STUDIO_SKIP_DOTENV: 'true',
      PORT: String(port), BASE_URL: origin, NODE_ENV: 'development', DEV_EMAIL_MODE: 'true',
      RESEND_API_KEY: '', EMAIL_FROM: '', SUPABASE_URL: '', SUPABASE_SECRET_KEY: '',
      SUPABASE_SERVICE_ROLE_KEY: '', SUPABASE_SERVICE_ROLE_KEY_LEGACY: '', GROQ_API_KEY: '',
      APIFY_API_TOKEN: '', DATA_FILE: join(tempDir, 'app-data.json')
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  child.stdout.on('data', data => { logs += data.toString(); });
  child.stderr.on('data', data => { logs += data.toString(); });
  await waitForServer();
});

after(async () => {
  if (child && child.exitCode === null) {
    child.kill('SIGTERM');
    await new Promise(resolveExit => child.once('exit', resolveExit));
  }
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
});

test('the trilingual dictionary is served and both language pickers exist on the page', async () => {
  const response = await fetch(origin);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /data-language="az"/);
  assert.match(html, /data-language="en"/);
  assert.match(html, /data-language="ru"/);
  assert.match(html, /id="mobile-nav-toggle"/);
  const i18n = await fetch(`${origin}/assets/i18n.js?v=20261026-v18-quality-gates`);
  assert.equal(i18n.status, 200);
  const script = await i18n.text();
  assert.match(script, /Welcome back/);
  assert.match(script, /С возвращением/);
  assert.match(script, /setLanguage/);
  assert.match(script, /lastTextOutput/);
  assert.match(script, /preparePhraseList/);
  assert.match(script, /alternatives\.join\('\|'\)/);
  assert.match(script, /value\.replace\(list\.pattern/);
  assert.match(script, /signalStudioLanguageV9/);
});

test('local development registration returns a real local verification link when email is not configured', async () => {
  const response = await fetch(`${origin}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Local Test', email: 'local-test@example.com', password: 'safeLocalPassword123', profileType: 'creator' })
  });
  const body = await response.json();
  assert.equal(response.status, 201);
  assert.equal(body.code, 'dev_verification_link_logged');
  assert.equal(body.dev, true);
  assert.match(body.message, /lokal mühitdə aktiv deyil/i);
  assert.doesNotMatch(body.message, /\.env|RESEND_API_KEY|GMAIL_APP_PASSWORD/i);
  const match = logs.match(/http:\/\/127\.0\.0\.1:\d+\/verify\?token=([A-Za-z0-9_-]+)/);
  assert.ok(match, `Verification link was not logged. Logs:\n${logs}`);
  const verification = await fetch(`${origin}/api/auth/verify?token=${encodeURIComponent(match[1])}`);
  const verificationBody = await verification.json();
  assert.equal(verification.status, 200);
  assert.equal(verificationBody.code, 'email_verified');
  assert.equal(verificationBody.user.emailVerified, true);
});
