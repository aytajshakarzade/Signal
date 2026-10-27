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
  tempDir = mkdtempSync(join(tmpdir(), 'signal-studio-test-'));
  child = spawn(process.execPath, [resolve('src/server.mjs')], {
    cwd: resolve('.'),
    env: { ...process.env, SIGNAL_STUDIO_SKIP_DOTENV: 'true', PORT: String(port), BASE_URL: origin, NODE_ENV: 'test', RESEND_API_KEY: '', EMAIL_FROM: '', SUPABASE_URL: '', SUPABASE_SECRET_KEY: '', SUPABASE_SERVICE_ROLE_KEY: '', GMAIL_USER: '', GMAIL_APP_PASSWORD: '', APIFY_API_TOKEN: '', GROQ_API_KEY: '', STRIPE_SECRET_KEY: '', STRIPE_PRICE_GO: '', STRIPE_PRICE_PRO: '', STRIPE_WEBHOOK_SECRET: '', DATA_FILE: join(tempDir, 'app-data.json') },
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

test('health endpoint reports email configuration without exposing secrets', async () => {
  const response = await fetch(`${origin}/api/health`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.emailConfigured, false);
  assert.equal(body.emailProvider, 'none');
  assert.equal(typeof body.nodemailerAvailable, 'boolean');
  assert.equal(body.apifyConfigured, false);
  assert.equal(body.build, 'v18-video-gates-trilingual-ui');
  assert.equal(body.envFileLoaded, false, 'test servers explicitly skip the private local .env file');
  assert.equal(body.supabaseUrlConfigured, false);
  assert.equal(JSON.stringify(body).includes('RESEND_API_KEY'), false);
});

test('registration rejects malformed email with a clear validation error', async () => {
  const response = await fetch(`${origin}/api/auth/register`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Test User', email: 'not-an-email', password: 'validpassword1' }) });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.code, 'invalid_email');
});

test('registration returns an actionable email-configuration error rather than fake success', async () => {
  const response = await fetch(`${origin}/api/auth/register`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: 'validpassword1' }) });
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.code, 'email_not_configured');
  assert.match(body.message, /Təsdiq məktubu/);
  assert.doesNotMatch(body.message, /RESEND_API_KEY|\.env/);
});

test('unverified accounts cannot sign in', async () => {
  const response = await fetch(`${origin}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'test@example.com', password: 'validpassword1' }) });
  const body = await response.json();
  assert.equal(response.status, 403);
  assert.equal(body.code, 'email_not_verified');
});

test('content API requires an authenticated session', async () => {
  const response = await fetch(`${origin}/api/content`);
  const body = await response.json();
  assert.equal(response.status, 401);
  assert.equal(body.code, 'auth_required');
});

test('Apify public data route requires an authenticated verified user', async () => {
  const response = await fetch(`${origin}/api/integrations/scrape`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ platform: 'instagram', target: 'nasa', limit: 5 }) });
  const body = await response.json();
  assert.equal(response.status, 401);
  assert.equal(body.code, 'auth_required');
});

test('config reports the selected social Actors without exposing the Apify token', async () => {
  const response = await fetch(`${origin}/api/config`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.apifyConfigured, false);
  assert.equal(body.groqConfigured, false);
  assert.equal(body.groqModel, '');
  assert.equal(body.groqVisionModel, '');
  assert.equal(Object.hasOwn(body, 'openAiConfigured'), false);
  assert.equal(Object.hasOwn(body, 'openAiModel'), false);
  assert.equal(body.apifyActors.instagram, 'apify/instagram-reel-scraper');
  assert.equal(body.apifyActors.tiktok, 'clockworks/tiktok-scraper');
  assert.equal(body.apifyActors.youtube, 'streamers/youtube-shorts-scraper');
  assert.equal(JSON.stringify(body).includes('APIFY_API_TOKEN'), false);
});

test('public navigation paths serve the app as separate shareable pages', async () => {
  for (const [route, pageName] of [['/predictor', 'predictor'], ['/features', 'features'], ['/how-it-works', 'how']]) {
    const response = await fetch(`${origin}${route}`);
    const html = await response.text();
    assert.equal(response.status, 200, `${route} should resolve`);
    assert.match(html, /dataset\.publicPage=routes\[p\]/);
    assert.ok(html.includes(`\"${route}\":\"${pageName}\"`), `${route} should map to ${pageName}`);
    assert.match(html, new RegExp(`data-route-link=\\"${pageName}\\"`));
  }
});

test('frontend is served from the same origin', async () => {
  const response = await fetch(origin);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Signal Studio — Mətn və video auditi/);
  assert.match(html, /v=20261026-v18-quality-gates/);
  assert.match(html, /id="view-connections"/);
  assert.match(html, /id="buddy-settings-card"|class="buddy-settings-card"/);
  assert.match(html, /data-buddy-avatar-choice/);
  assert.match(html, /id="signal-approach"/);
  assert.doesNotMatch(html, /id="view-difference"/);
  assert.match(html, /Video auditi/);
  assert.match(html, /Yazı və danışıq/);
  assert.match(html, /Öz məlumatların/);
  assert.doesNotMatch(html, /CreatorML|Grocalo|Y Combinator profili/);
  assert.match(html, /scrape-include-transcript/);
  assert.match(html, /data-theme-toggle/);
  const css = await fetch(`${origin}/assets/styles.css?v=20261026-v18-quality-gates`);
  assert.equal(css.status, 200);
  const cssText = await css.text();
  assert.match(cssText, /SIGNAL STUDIO v13/);
  assert.match(cssText, /data-theme=\"dark\"/);
  assert.match(cssText, /scrape-result-card/);
  assert.match(cssText, /legible navigation \+ simplified workspace dashboard/);
  assert.match(cssText, /overview-action-card/);
  const app = await fetch(`${origin}/assets/app.js?v=20261026-v18-quality-gates`);
  assert.equal(app.status, 200);
  const appText = await app.text();
  assert.match(appText, /runPublicScrape/);
  assert.match(appText, /downloadScrapeCsv/);
  const interactions = await fetch(`${origin}/assets/interactions.js?v=20261026-v18-quality-gates`);
  assert.equal(interactions.status, 200);
  const interactionText = await interactions.text();
  assert.match(interactionText, /scroll-progress-bar/);
  assert.match(interactionText, /signalStudioTheme/);
});


test('server-side text analysis returns a real structural assessment rather than hardcoded dashboard scores', async () => {
  const response = await fetch(`${origin}/api/analyze-preview`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: 'Niyə bəzi kontent ideyaları daha çox diqqət çəkir? Faydalı üç addımı izah edirik. Rəyini yaz və paylaşımı yadda saxla.', platform: 'Instagram', goal: 'engagement' }) });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.engine, 'rule_based');
  assert.ok(body.score >= 1 && body.score <= 99);
  assert.ok(Array.isArray(body.recommendations));
  assert.equal(body.platform, 'Instagram');
});

test('AI assistant and billing endpoints require a verified signed-in session', async () => {
  const chat = await fetch(`${origin}/api/ai/chat`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message: 'Salam' }) });
  const chatBody = await chat.json();
  assert.equal(chat.status, 401);
  assert.equal(chatBody.ok, false);

  const billing = await fetch(`${origin}/api/billing/status`);
  const billingBody = await billing.json();
  assert.equal(billing.status, 401);
  assert.equal(billingBody.ok, false);

  const checkout = await fetch(`${origin}/api/billing/checkout`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ plan: 'pro' }) });
  assert.equal(checkout.status, 401);
});

test('premium workspace has separate video, AI assistant and billing views, with fixed-theme styles', async () => {
  const response = await fetch(origin);
  const html = await response.text();
  assert.match(html, /id="view-predictor"/);
  assert.match(html, /id="view-video"/);
  assert.match(html, /id="view-assistant"/);
  assert.match(html, /id="view-billing"/);
  assert.doesNotMatch(html, /class="side-link[^"]*"[^>]*data-view="assistant"/);
  assert.match(html, /data-view="billing"/);
  assert.doesNotMatch(html, /78\.4\/100|86\/100|72\/100|MAKET · DEMO|Demo rejim/);
  assert.doesNotMatch(html, /APIFY_API_TOKEN|GROQ_API_KEY|RESEND_API_KEY|\.env faylında|Demo və uydurma statistika yoxdur|Public kontent məlumatını gətir|OWNER-ACCOUNT ANALYTICS/);

  const css = await fetch(`${origin}/assets/styles.css?v=20261026-v18-quality-gates`);
  const cssText = await css.text();
  assert.match(cssText, /position:\s*fixed/);
  assert.match(cssText, /\.sidebar-nav-scroll/);
  assert.match(cssText, /data-theme="light"/);
  assert.match(cssText, /billing-plan-grid/);
  assert.match(cssText, /assistant-messages/);
  assert.match(cssText, /signal-chat-widget/);
  assert.match(cssText, /signal-tour/);
});
