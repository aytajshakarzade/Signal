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
  for (let i = 0; i < 80; i++) {
    if (child.exitCode !== null) throw new Error(`Server exited early. Logs:\n${logs}`);
    try { if ((await fetch(`${origin}/api/health`)).ok) return; } catch { /* wait for startup */ }
    await new Promise(resolveWait => setTimeout(resolveWait, 100));
  }
  throw new Error(`Server failed to start. Logs:\n${logs}`);
}

before(async () => {
  port = await freePort();
  origin = `http://127.0.0.1:${port}`;
  tempDir = mkdtempSync(join(tmpdir(), 'signal-studio-mail-provider-fail-'));
  child = spawn(process.execPath, ['--import', resolve('tests/mock-resend.mjs'), resolve('src/server.mjs')], {
    cwd: resolve('.'),
    env: {
      ...process.env,
      SIGNAL_STUDIO_SKIP_DOTENV: 'true', PORT: String(port), BASE_URL: origin,
      NODE_ENV: 'development', DEV_EMAIL_MODE: 'true',
      RESEND_API_KEY: 're_test_mock', EMAIL_FROM: 'onboarding@resend.dev',
      GMAIL_USER: '', GMAIL_APP_PASSWORD: '', SUPABASE_URL: '',
      SUPABASE_SECRET_KEY: '', SUPABASE_SERVICE_ROLE_KEY: '',
      GROQ_API_KEY: '', APIFY_API_TOKEN: '', DATA_FILE: join(tempDir, 'app-data.json')
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

test('configured email provider rejection is reported instead of fake local success', async () => {
  const response = await fetch(`${origin}/api/auth/register`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Provider Test', email: 'provider-test@example.com', password: 'safePassword123' })
  });
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.code, 'email_sender_or_domain_not_verified');
  assert.equal(body.dev, undefined);
  assert.match(body.message, /Resend test rejimində|domeni Resend/i);
  assert.match(logs, /Resend delivery error: 403/);
  assert.doesNotMatch(logs, /\[DEV EMAIL MODE\]/);
});
