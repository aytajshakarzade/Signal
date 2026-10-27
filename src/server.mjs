import http from 'node:http';
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, createWriteStream, rmSync } from 'node:fs';
import { dirname, extname, join, resolve, relative, isAbsolute, sep, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, randomUUID, createHash, createHmac, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { execFile as execFileCallback } from 'node:child_process';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { parseFfmpegDuration } from './media-utils.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');
const scrypt = promisify(scryptCb);
const execFile = promisify(execFileCallback);
const require = createRequire(import.meta.url);
let FFMPEG_BIN = 'ffmpeg';
try { const bundledFfmpeg = require('ffmpeg-static'); if (bundledFfmpeg) FFMPEG_BIN = bundledFfmpeg; } catch { /* Fall back to FFmpeg installed in system PATH. */ }
const MAX_VIDEO_BYTES = 500 * 1024 * 1024;

const ENV_FILE = join(ROOT, '.env');
let ENV_FILE_LOADED = false;
function loadDotEnv(file = ENV_FILE) {
  // Tests explicitly opt out so the local developer's real .env never contaminates test cases.
  if (process.env.SIGNAL_STUDIO_SKIP_DOTENV === 'true') return;
  if (!existsSync(file)) return;
  ENV_FILE_LOADED = true;
  const rows = readFileSync(file, 'utf8').split(/\r?\n/);
  for (const row of rows) {
    const line = row.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    // A non-empty OS environment variable wins. An empty shell variable must not
    // accidentally mask a correct value saved in the project's .env file.
    if (process.env[match[1]] !== undefined && String(process.env[match[1]]).trim() !== '') continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}
loadDotEnv();

// Optional private email configuration lives in email.local, separate from .env.
// Values in process.env take precedence, and secrets are never logged.
const MAIL_CONFIG_FILE = join(ROOT, 'email.local');
if (process.env.SIGNAL_STUDIO_SKIP_DOTENV !== 'true' && existsSync(MAIL_CONFIG_FILE)) {
  for (const row of readFileSync(MAIL_CONFIG_FILE, 'utf8').split(/\r?\n/)) {
    const line = row.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match || (process.env[match[1]] !== undefined && String(process.env[match[1]]).trim() !== '')) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}

const PORT = Math.max(1, Math.min(65535, Number.parseInt(process.env.PORT || '3000', 10) || 3000));
const NODE_ENV = process.env.NODE_ENV || 'development';
const configuredBaseUrl = String(process.env.BASE_URL || '').trim().replace(/\/$/, '');
const invalidBaseUrl = /YOUR-RENDER-SERVICE/i.test(configuredBaseUrl) || (NODE_ENV === 'production' && /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configuredBaseUrl));
const BASE_URL = (invalidBaseUrl ? (process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`) : (configuredBaseUrl || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`)).replace(/\/$/, '');
const EMAIL_FROM = process.env.EMAIL_FROM || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const GMAIL_USER = (process.env.GMAIL_USER || '').trim();
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
const GROQ_API_KEY = (process.env.GROQ_API_KEY || '').trim();
const APIFY_API_TOKEN = (process.env.APIFY_API_TOKEN || '').trim();
const STRIPE_SECRET_KEY = (process.env.STRIPE_SECRET_KEY || '').trim();
const STRIPE_PRICE_GO = (process.env.STRIPE_PRICE_GO || '').trim();
const STRIPE_PRICE_PRO = (process.env.STRIPE_PRICE_PRO || '').trim();
const STRIPE_WEBHOOK_SECRET = (process.env.STRIPE_WEBHOOK_SECRET || '').trim();
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
const GROQ_VISION_MODEL = process.env.GROQ_VISION_MODEL || 'qwen/qwen3.8-27b';
const GROQ_TRANSCRIPTION_MODEL = process.env.GROQ_TRANSCRIPTION_MODEL || 'whisper-large-v3-turbo';
const TREND_RSS_URL = process.env.TREND_RSS_URL || 'https://trends.google.com/trending/rss';
// Supabase Auth provisioning. Prefer a real server-side key over a publishable key,
// regardless of which environment-variable name it was pasted into. Never expose these values.
const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SUPABASE_KEY_CANDIDATES = [
  { name: 'SUPABASE_SECRET_KEY', value: (process.env.SUPABASE_SECRET_KEY || '').trim() },
  { name: 'SUPABASE_SERVICE_ROLE_KEY', value: (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim() },
  { name: 'SUPABASE_SERVICE_ROLE_KEY_LEGACY', value: (process.env.SUPABASE_SERVICE_ROLE_KEY_LEGACY || '').trim() }
].filter(item => item.value);
function legacyJwtRole(key) {
  if (!key || !key.startsWith('eyJ')) return '';
  try { return JSON.parse(Buffer.from(key.split('.')[1] || '', 'base64url').toString('utf8')).role || ''; }
  catch { return ''; }
}
function isPublishableSupabaseKey(key) {
  return key.startsWith('sb_publishable_') || legacyJwtRole(key) === 'anon';
}
function keyPriority(key) {
  if (key.startsWith('sb_secret_')) return 4;
  if (legacyJwtRole(key) === 'service_role') return 3;
  // Unknown/mock values are allowed for local test adapters; known public keys are not.
  return 1;
}
const SUPABASE_KEY_CANDIDATES_SORTED = SUPABASE_KEY_CANDIDATES
  .filter(item => !isPublishableSupabaseKey(item.value))
  .sort((a, b) => keyPriority(b.value) - keyPriority(a.value));
const SUPABASE_ADMIN_KEY_ENTRY = SUPABASE_KEY_CANDIDATES_SORTED[0] || null;
const SUPABASE_ADMIN_KEY = SUPABASE_ADMIN_KEY_ENTRY?.value || '';
const SUPABASE_KEY_SOURCE = SUPABASE_ADMIN_KEY_ENTRY?.name || '';
// Optional fallback: legacy service_role JWT for hosted Auth Admin mutations if a
// project temporarily rejects sb_secret_* credentials on POST/PUT/DELETE.
const SUPABASE_LEGACY_SERVICE_ROLE_JWT = [
  (process.env.SUPABASE_SERVICE_ROLE_KEY_LEGACY || '').trim(),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim(),
  (process.env.SUPABASE_SECRET_KEY || '').trim()
].find(key => legacyJwtRole(key) === 'service_role') || '';
const SUPABASE_KEY_TYPE = !SUPABASE_URL ? 'url_missing'
  : SUPABASE_ADMIN_KEY ? (SUPABASE_ADMIN_KEY.startsWith('sb_secret_') ? 'secret_api_key'
    : legacyJwtRole(SUPABASE_ADMIN_KEY) === 'service_role' ? 'legacy_service_role'
    : 'server_key_candidate')
  : SUPABASE_KEY_CANDIDATES.length ? 'publishable_key_only' : 'key_missing';
const SUPABASE_AUTH_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ADMIN_KEY);
const APP_BUILD = 'v21-username-password-auth';
// IP-based one-account enforcement blocks legitimate sign-ups on shared Wi-Fi/mobile networks.
// Keep it opt-in through ONE_ACCOUNT_PER_IP=true; rate limiting still protects the endpoint.
const ONE_ACCOUNT_PER_IP = String(process.env.ONE_ACCOUNT_PER_IP || '').toLowerCase() === 'true';
const DATA_FILE = resolve(ROOT, process.env.DATA_FILE || 'data/app-data.json');
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;
const VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24;
const SESSION_COOKIE = 'signal_session';

function blankDb() { return { users: [], sessions: [], content: [], metrics: [], businessProfiles: [], referralClicks: [], referralEvents: [], aiUsage: [] }; }
function readDb() {
  try {
    const parsed = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
    return { users: Array.isArray(parsed.users) ? parsed.users : [], sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [], content: Array.isArray(parsed.content) ? parsed.content : [], metrics: Array.isArray(parsed.metrics) ? parsed.metrics : [], businessProfiles: Array.isArray(parsed.businessProfiles) ? parsed.businessProfiles : [], referralClicks: Array.isArray(parsed.referralClicks) ? parsed.referralClicks : [], referralEvents: Array.isArray(parsed.referralEvents) ? parsed.referralEvents : [], aiUsage: Array.isArray(parsed.aiUsage) ? parsed.aiUsage : [] };
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Database file could not be read:', error.message);
    return blankDb();
  }
}
let db = readDb();
function persist() {
  mkdirSync(dirname(DATA_FILE), { recursive: true });
  const temp = `${DATA_FILE}.${process.pid}.tmp`;
  writeFileSync(temp, JSON.stringify(db, null, 2), { mode: 0o600 });
  renameSync(temp, DATA_FILE);
}

const rates = new Map();
function rateLimited(req, key, limit = 12, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const ip = req.socket.remoteAddress || 'unknown';
  const id = `${ip}:${key}`;
  let item = rates.get(id);
  if (!item || item.until <= now) item = { count: 0, until: now + windowMs };
  item.count += 1;
  rates.set(id, item);
  if (rates.size > 3000) for (const [k, v] of rates) if (v.until <= now) rates.delete(k);
  return item.count > limit;
}

function json(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extraHeaders });
  res.end(body);
}
function readCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const name = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();
    try { out[name] = decodeURIComponent(value); } catch { /* ignore malformed cookie */ }
  }
  return out;
}
function cookieHeader(token, maxAge) {
  const bits = [`${SESSION_COOKIE}=${encodeURIComponent(token)}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${Math.max(0, Math.floor(maxAge / 1000))}`];
  if (NODE_ENV === 'production') bits.push('Secure');
  return bits.join('; ');
}
function sessionCookieClear() { return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${NODE_ENV === 'production' ? '; Secure' : ''}`; }
function tokenHash(token) { return createHash('sha256').update(token).digest('hex'); }
function safeUser(user) { return { id: user.id, name: user.name, username: user.username || '', email: user.username ? '' : user.email, emailVerified: Boolean(user.verified), profileType: user.profileType || 'creator', referralCode: user.referralCode || '', rewardPoints: Number(user.rewardPoints) || 0, plan: ['free','go','pro'].includes(user.plan) ? user.plan : 'free', createdAt: user.createdAt }; }
function clientIpHash(req) { const ip = String(req.socket.remoteAddress || 'unknown').replace(/^::ffff:/, ''); return createHash('sha256').update(ip).digest('hex'); }
function createReferralCode() { return randomBytes(5).toString('hex').toUpperCase(); }
function round(value, digits = 2) { const n = Number(value); return Number.isFinite(n) ? Number(n.toFixed(digits)) : 0; }
function median(values) { if (!values.length) return 0; const a = [...values].sort((x,y)=>x-y), m = Math.floor(a.length/2); return a.length % 2 ? a[m] : (a[m-1]+a[m])/2; }
function csvSafeNumber(v) { if (v === null || v === undefined || v === '') return 0; const n = Number(String(v).replace(/[,%\s]/g, '')); return Number.isFinite(n) && n >= 0 ? n : 0; }
function metricRate(item) { const views = Number(item.views) || 0; return views ? ((Number(item.likes)||0)+(Number(item.comments)||0)+(Number(item.shares)||0)+(Number(item.saves)||0))/views*100 : 0; }
function plainXml(value = '') {
  return String(value).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '\"').replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, x) => String.fromCharCode(parseInt(x, 16)))
    .replace(/&#(\d+);/g, (_, x) => String.fromCharCode(Number(x))).replace(/\s+/g, ' ').trim();
}
function xmlTag(block, tag) {
  const escaped = tag.replace(':', ':');
  const match = block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
  return match ? plainXml(match[1]) : '';
}
function contentTextReview(text, goal = 'engagement') { const clean=String(text||'').trim(); const words=clean.match(/[\p{L}\p{N}_#@'-]+/gu)||[]; const lower=clean.toLocaleLowerCase('az-AZ'); const hookWords=['necə','niyə','sən','bəs','kəşf','öyrən','səhv','how','why','you','discover']; const hasHook=hookWords.some(x=>lower.includes(x)); const question=clean.includes('?'); const hasCta=/(şərh|yaz|izlə|saxla|paylaş|daxil ol|link|müraciət|comment|follow|save|share|book|register)/i.test(clean); const first=(clean.split(/[.!?\n]/)[0]||''); const hashtags=(clean.match(/#[\p{L}\p{N}_]+/gu)||[]).length; const hook=Math.max(20,Math.min(96,45+(hasHook?20:0)+(question?12:0)+(first.length<=90?8:-8))); const readability=Math.max(20,Math.min(96,85-Math.max(0,words.length-50)*.7-Math.max(0,clean.length-380)*.025+(words.length>10?4:0))); const engagement=Math.max(20,Math.min(96,45+(hasCta?22:0)+(question?10:0)+(goal==='engagement'?8:goal==='leads'?5:0)+(hashtags?3:0))); const score=Math.round(hook*.38+readability*.29+engagement*.33); const recommendations=[]; if(!hasHook)recommendations.push('İlk cümlədə konkret sual, ziddiyyət və ya faydanı göstərən hook istifadə et.'); if(first.length>120)recommendations.push('İlk cümləni qısalt: əsas faydanı ilk 1–2 sətirdə de.'); if(!hasCta)recommendations.push('Məqsədə uyğun çağırış əlavə et: şərh yaz, saxla, linkə keç və ya müraciət et.'); if(words.length<12)recommendations.push('Dəyər təklifini konkret nümunə və ya səbəblə izah et.'); if(hashtags>8)recommendations.push('Hashtag sayını mövzu ilə birbaşa əlaqəli bir neçə etiketə endir.'); if(!recommendations.length)recommendations.push('Struktur aydındır. İndi nəticəni şəxsi hesab tarixçənlə müqayisə et.'); return { score, hook: Math.round(hook), readability: Math.round(readability), engagement: Math.round(engagement), words: words.length, recommendations }; }
async function askGroq(messages) {
  if (!GROQ_API_KEY) return null;
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: GROQ_MODEL, messages, response_format: { type: 'json_object' }, temperature: 0.2, max_completion_tokens: 1400 }),
    signal: AbortSignal.timeout(45000)
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = response.status === 401 ? 'AI xidməti hazırda əlçatan deyil. Bir az sonra yenidən cəhd et.'
      : response.status === 429 ? 'Groq istifadə limitinə çatılıb. Groq Console-da limitləri yoxla və sonra yenidən sına.'
      : response.status === 400 ? 'Groq sorğusu qəbul edilmədi. Model adını və API parametrlərini yoxla.'
      : 'Groq AI sorğunu qəbul etmədi. API açarını, modeli və hesab limitlərini yoxla.';
    throw Object.assign(new Error(message), { status: 503, code: 'ai_provider_error' });
  }
  const raw = body.choices?.[0]?.message?.content;
  const text = (typeof raw === 'string' ? raw : Array.isArray(raw) ? raw.map(part => part?.text || '').join('') : '').trim();
  if (!text) throw Object.assign(new Error('Groq AI boş cavab qaytardı. Yenidən cəhd et.'), { status: 503, code: 'ai_empty_response' });
  try { return JSON.parse(text); }
  catch {
    const first = text.indexOf('{'), last = text.lastIndexOf('}');
    if (first >= 0 && last > first) { try { return JSON.parse(text.slice(first, last + 1)); } catch { /* handled below */ } }
    throw Object.assign(new Error('Groq AI cavabını strukturlaşdırmaq mümkün olmadı. Yenidən cəhd et.'), { status: 503, code: 'ai_invalid_response' });
  }
}
async function fetchTrendFeed(geo = 'AZ') {
  const region = geo === 'WORLD' ? 'US' : geo;
  const feedUrl = new URL(TREND_RSS_URL); feedUrl.searchParams.set('geo', region);
  if (geo === 'WORLD') feedUrl.searchParams.set('hl', 'en-US');
  const response = await fetch(feedUrl, { headers: { 'User-Agent': 'SignalStudio/1.0 (trend RSS reader)' }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Trend mənbəyi HTTP ${response.status} cavabı qaytardı.`);
  const xml = await response.text();
  const blocks = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(m => m[1]);
  return blocks.map((block, i) => {
    const title = xmlTag(block, 'title'); const description = xmlTag(block, 'description'); const link = xmlTag(block, 'link');
    const traffic = xmlTag(block, 'ht:approx_traffic') || xmlTag(block, 'approx_traffic'); const pubDate = xmlTag(block, 'pubDate');
    return { id: `${region}-${i}-${tokenHash(title).slice(0, 8)}`, title, description: description.slice(0, 360), url: /^https?:\/\//i.test(link) ? link : '', traffic, pubDate, source: 'Google Trends RSS' };
  }).filter(x => x.title);
}

async function checkFfmpeg() {
  try { await execFile(FFMPEG_BIN, ['-version'], { timeout: 5000, windowsHide: true }); return true; }
  catch { return false; }
}
async function getVideoDurationSeconds(inputPath) {
  // FFmpeg is bundled with this project. Read its media metadata instead of
  // requiring a separate ffprobe executable to be installed on PATH.
  let output = '';
  try {
    const result = await execFile(FFMPEG_BIN, ['-hide_banner', '-i', inputPath], {
      timeout: 15000, windowsHide: true, maxBuffer: 2 * 1024 * 1024
    });
    output = `${result.stdout || ''}\n${result.stderr || ''}`;
  } catch (error) {
    // `ffmpeg -i` normally exits non-zero because no output was requested;
    // media metadata is still reported on stderr.
    output = `${error.stdout || ''}\n${error.stderr || ''}`;
  }
  return parseFfmpegDuration(output);
}
async function transcribeAudio(audioPath) {
  if (!GROQ_API_KEY || !audioPath || !existsSync(audioPath)) return '';
  const audio = readFileSync(audioPath);
  if (!audio.length || audio.length > 23 * 1024 * 1024) return '';
  const form = new FormData();
  form.append('file', new Blob([audio], { type: 'audio/mpeg' }), 'signal-studio-audio.mp3');
  form.append('model', GROQ_TRANSCRIPTION_MODEL);
  form.append('response_format', 'json');
  const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', { method: 'POST', headers: { Authorization: `Bearer ${GROQ_API_KEY}` }, body: form, signal: AbortSignal.timeout(90000) });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) { console.warn('Groq audio transcription unavailable:', response.status); return ''; }
  return normalizeText(body.text, 12000);
}
async function reviewVideoWithGroq({ frames, durationSeconds, transcript, platform, sector, audience, goal, language = 'az' }) {
  const responseLanguage = language === 'en' ? 'English' : language === 'ru' ? 'Russian' : 'Azerbaijani';
  // Groq's current Qwen vision model accepts up to three images per request.
  // Sample the beginning, middle and end of the extracted frame sequence.
  const sampledFrames = frames.length <= 3
    ? frames
    : [frames[0], frames[Math.floor((frames.length - 1) / 2)], frames[frames.length - 1]];
  const content = [{ type: 'text', text: `Analyze this uploaded social video for Signal Studio. Respond entirely in ${responseLanguage} using valid JSON only. Assess the opening hook using the first frame, visual clarity/composition, visible on-screen text and legibility, pacing/editing impressions from the sampled sequence, audio/message clarity (use transcript if provided), audience fit, and actionable edits. Use only the visible evidence; do not claim details that cannot be inferred from the sampled frames. Never claim real future views, virality probability, or predicted engagement. Score 0-100 is only a creative-quality review score, not a performance prediction. Return JSON keys: title, summary, score, scoreLabel, hook, visualClarity, onScreenText, pacing, audioClarity, recommendations (array of strings), disclaimer. Context: ${JSON.stringify({ durationSeconds, sampledFrames: sampledFrames.length, transcript: transcript.slice(0, 7000), platform, sector, audience, goal })}` }];
  for (const frame of sampledFrames) content.push({ type: 'image_url', image_url: { url: `data:image/jpeg;base64,${frame.toString('base64')}` } });
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: GROQ_VISION_MODEL, messages: [
      { role: 'system', content: `You are a careful multimodal social video reviewer. Separate observable facts from interpretation. Do not invent transcript, metrics, or performance claims. Reply only with a valid JSON object in ${responseLanguage}.` },
      { role: 'user', content }
    ], response_format: { type: 'json_object' }, temperature: 0.2, max_completion_tokens: 1800 }),
    signal: AbortSignal.timeout(90000)
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = response.status === 401 ? 'AI xidməti hazırda əlçatan deyil. Bir az sonra yenidən cəhd et.'
      : response.status === 429 ? 'Groq video analiz limitinə çatılıb. Groq Console-da limitləri yoxla.'
      : response.status === 400 ? 'Video analizi hazırda bu sorğunu emal edə bilmir. Başqa video ilə yenidən cəhd et.'
      : 'Video analizi hazırda tamamlanmadı. Bir az sonra yenidən cəhd et.';
    throw Object.assign(new Error(message), { status: 503, code: 'video_ai_error' });
  }
  const text = body.choices?.[0]?.message?.content;
  try { return typeof text === 'string' ? JSON.parse(text) : {}; }
  catch {
    const a = String(text || '').indexOf('{'), b = String(text || '').lastIndexOf('}');
    if (a >= 0 && b > a) { try { return JSON.parse(String(text).slice(a, b + 1)); } catch { /* handled below */ } }
    throw Object.assign(new Error('Groq video nəticəsini oxumaq mümkün olmadı.'), { status: 503, code: 'video_ai_parse_error' });
  }
}
async function handleVideoApi(req, res, url) {
  const user = requirePlan(req, res, 'go'); if (!user) return;
  if (!GROQ_API_KEY) return json(res, 503, { ok: false, code: 'ai_not_configured', message: 'Video analizi hazırda əlçatan deyil. Bir az sonra yenidən cəhd et.' });
  if (rateLimited(req, 'video-analysis', 8, 60 * 60 * 1000)) return json(res, 429, { ok: false, code: 'video_rate_limited', message: 'Video analiz limiti dolub. Bir saat sonra yenidən cəhd et.' });
  const filename = normalizeText(url.searchParams.get('filename') || 'video.mp4', 220);
  const extension = extname(basename(filename)).toLowerCase();
  if (!['.mp4', '.mov'].includes(extension)) return json(res, 400, { ok: false, code: 'invalid_video_type', message: 'Yalnız MP4 və MOV video faylları qəbul edilir.' });
  const statedLength = Number(req.headers['content-length'] || 0);
  if (statedLength > MAX_VIDEO_BYTES) return json(res, 413, { ok: false, code: 'video_too_large', message: 'Video 500 MB-dan böyükdür.' });
  if (!await checkFfmpeg()) return json(res, 503, { ok: false, code: 'ffmpeg_not_installed', message: 'Video emalı hazırda əlçatan deyil. Bir az sonra yenidən cəhd et.' });
  const workRoot = join(ROOT, 'data', 'video-work'); mkdirSync(workRoot, { recursive: true });
  const workDir = join(workRoot, randomUUID()); mkdirSync(workDir, { recursive: true });
  const inputPath = join(workDir, `input${extension}`); const framePattern = join(workDir, 'frame-%02d.jpg'); const audioPath = join(workDir, 'audio.mp3');
  let received = 0;
  const limiter = new Transform({ transform(chunk, encoding, callback) { received += chunk.length; if (received > MAX_VIDEO_BYTES) return callback(Object.assign(new Error('Video 500 MB limitini keçir.'), { status: 413, code: 'video_too_large' })); callback(null, chunk); } });
  try {
    await pipeline(req, limiter, createWriteStream(inputPath, { flags: 'wx' }));
    if (received < 1024) return json(res, 400, { ok: false, code: 'empty_video', message: 'Yüklənmiş fayl boş və ya düzgün deyil.' });
    const durationSeconds = await getVideoDurationSeconds(inputPath);
    if (durationSeconds > 3600) return json(res, 400, { ok: false, code: 'video_too_long', message: 'MVP video analizində fayl maksimum 60 dəqiqə ola bilər.' });
    const interval = Math.max(1, Math.ceil((durationSeconds || 24) / 7));
    try { await execFile(FFMPEG_BIN, ['-hide_banner', '-loglevel', 'error', '-y', '-i', inputPath, '-vf', `fps=1/${interval},scale=768:-2`, '-frames:v', '8', '-q:v', '4', framePattern], { timeout: 120000, windowsHide: true, maxBuffer: 4 * 1024 * 1024 }); }
    catch (error) { return json(res, 400, { ok: false, code: 'video_decode_failed', message: 'Video faylı açıla bilmədi. MP4/MOV formatını və faylın sağlam olduğunu yoxla.' }); }
    try { await execFile(FFMPEG_BIN, ['-hide_banner', '-loglevel', 'error', '-y', '-i', inputPath, '-t', '600', '-vn', '-ac', '1', '-ar', '16000', '-b:a', '48k', audioPath], { timeout: 120000, windowsHide: true, maxBuffer: 2 * 1024 * 1024 }); } catch { /* video may have no audio */ }
    const frames = [];
    for (let i = 1; i <= 8; i++) { const file = join(workDir, `frame-${String(i).padStart(2, '0')}.jpg`); if (existsSync(file)) frames.push(readFileSync(file)); }
    if (!frames.length) return json(res, 400, { ok: false, code: 'no_video_frames', message: 'Videodan kadr çıxarmaq mümkün olmadı.' });
    let transcript = ''; try { transcript = await transcribeAudio(audioPath); } catch (error) { console.warn('Transcription failed:', error.message); }
    const platform = normalizeText(req.headers['x-video-platform'] || 'Instagram', 40); const sector = normalizeText(req.headers['x-video-sector'] || '', 120); const audience = normalizeText(req.headers['x-video-audience'] || '', 160); const goal = normalizeText(req.headers['x-video-goal'] || 'engagement', 50);
    const language = ['en', 'ru'].includes(String(req.headers['x-ui-language'] || 'az').toLowerCase()) ? String(req.headers['x-ui-language']).toLowerCase() : 'az';
    const ai = await reviewVideoWithGroq({ frames, durationSeconds, transcript, platform, sector, audience, goal, language });
    const score = Number.isFinite(Number(ai.score)) ? Math.min(100, Math.max(0, Math.round(Number(ai.score)))) : 0;
    const numeric = v => Number.isFinite(Number(v)) ? Math.min(100, Math.max(0, Math.round(Number(v)))) : null;
    const recommendations = Array.isArray(ai.recommendations) ? ai.recommendations.filter(x => typeof x === 'string').slice(0, 8) : [];
    return json(res, 200, { ok: true, title: normalizeText(ai.title, 180) || 'Video analizi tamamlandı', summary: normalizeText(ai.summary, 500) || `${platform} · ${durationSeconds ? `${Math.round(durationSeconds)} saniyə` : 'müddət oxunmadı'} · ${Math.min(frames.length, 3)} kadr analiz edildi`, score, scoreKind: 'Video keyfiyyət balı', scoreLabel: normalizeText(ai.scoreLabel, 120) || 'Kreativ struktur qiymətləndirildi', confidenceLabel: 'Multimodal AI icmalı; future engagement kalibrasiyası yoxdur', hook: numeric(ai.hook), readability: numeric(ai.visualClarity), engagement: numeric(ai.pacing), onScreenText: numeric(ai.onScreenText), audioClarity: numeric(ai.audioClarity), transcript, durationSeconds: durationSeconds || null, frameCount: Math.min(frames.length, 3), audioAnalyzed: Boolean(transcript), recommendations, engine: 'groq_video', disclaimer: normalizeText(ai.disclaimer, 600) || 'Bu video icmalı gələcək baxış/viral olma zəmanəti deyil. Video faylı analizdən sonra silinir.' });
  } catch (error) {
    if (!res.headersSent) return json(res, error.status || 500, { ok: false, code: error.code || 'video_analysis_failed', message: error.status ? error.message : 'Video emalı zamanı xəta baş verdi. FFmpeg və fayl formatını yoxla.' });
    res.destroy();
  } finally { rmSync(workDir, { recursive: true, force: true }); }
}

function getSessionUser(req) {
  const token = readCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const hash = tokenHash(token);
  const now = Date.now();
  const session = db.sessions.find(s => s.tokenHash === hash && s.expiresAt > now);
  if (!session) return null;
  const user = db.users.find(u => u.id === session.userId && u.verified);
  if (!user) return null;
  return user;
}
function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(BASE_URL).origin; } catch { return false; }
}
async function bodyJson(req, maxBytes = 64 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) throw Object.assign(new Error('Sorğu çox böyükdür.'), { status: 413, code: 'body_too_large' });
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error('Sorğunun formatı düzgün deyil.'), { status: 400, code: 'invalid_json' }); }
}
function validateEmail(email) { return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function normalizeText(value, max = 500) { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }
async function passwordDigest(password, saltHex = randomBytes(16).toString('hex')) {
  const buffer = await scrypt(password, Buffer.from(saltHex, 'hex'), 64);
  return { salt: saltHex, hash: buffer.toString('hex') };
}
async function passwordMatches(password, user) {
  const candidate = await scrypt(password, Buffer.from(user.passwordSalt, 'hex'), 64);
  const expected = Buffer.from(user.passwordHash, 'hex');
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}
function developmentVerificationFallback(user, rawToken, reason = 'email provider unavailable') {
  // A local-link fallback is useful only when no mail provider is configured.
  // Never turn a real provider rejection (invalid Gmail credentials, Resend 403,
  // missing transport package, etc.) into a green/success signup message.
  const providerConfigured = Boolean(GMAIL_USER || GMAIL_APP_PASSWORD || RESEND_API_KEY || EMAIL_FROM);
  if (providerConfigured || NODE_ENV !== 'development' || process.env.DEV_EMAIL_MODE === 'false') return null;
  const devUrl = `${BASE_URL}/verify?token=${encodeURIComponent(rawToken)}`;
  console.warn(`[DEV EMAIL MODE] Real e-poçt göndərilmədi (${String(reason).slice(0, 180)}).`);
  console.log(`\n[DEV EMAIL MODE] ${user.email} üçün yalnız lokal istifadə edilən təsdiq linki:\n${devUrl}\n`);
  return { ok: true, dev: true, id: 'development-only' };
}
async function sendVerificationEmail(user, rawToken) {
  const verifyUrl = `${BASE_URL}/verify?token=${encodeURIComponent(rawToken)}`;
  const firstName = escapeHtml(user.name.split(/\s+/)[0] || 'yaradıcı');
  const html = `<!doctype html><html><body style="margin:0;background:#0b100c;color:#edf2e8;font-family:Arial,sans-serif;padding:36px 12px"><div style="max-width:560px;margin:auto;background:#121913;border:1px solid #303d2e;border-radius:18px;padding:32px"><div style="font-size:13px;font-weight:bold;letter-spacing:1px;color:#ceff70">↗ SIGNAL / STUDIO</div><h1 style="font-size:27px;letter-spacing:-1px;margin:24px 0 10px">Xoş gəldin, ${firstName}.</h1><p style="color:#b0bdac;line-height:1.7">AI Social Content Predictor hesabını təsdiqləmək üçün aşağıdakı düyməyə klik et.</p><p style="margin:28px 0"><a href="${verifyUrl}" style="background:#ceff70;color:#11170c;text-decoration:none;font-weight:bold;border-radius:10px;padding:13px 18px;display:inline-block">E-poçtu təsdiqlə ↗</a></p><p style="font-size:12px;line-height:1.7;color:#97a491">Link 24 saat ərzində etibarlıdır. Bu hesabı sən yaratmamısansa, məktubu nəzərə almaya bilərsən.</p><p style="font-size:11px;line-height:1.6;color:#788673;word-break:break-word">Düymə işləmirsə bu linki aç: ${verifyUrl}</p></div></body></html>`;
  const text = `Salam ${user.name}. Hesabını təsdiqlə: ${verifyUrl}\n\nLink 24 saat ərzində etibarlıdır.`;

  // Gmail SMTP is preferred when the separate email.local config is completed.
  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
        connectionTimeout: 12000,
        greetingTimeout: 12000,
        socketTimeout: 15000
      });
      const info = await transporter.sendMail({
        from: { name: 'Signal Studio', address: GMAIL_USER },
        to: user.email,
        subject: 'E-poçt ünvanını təsdiqlə — Signal Studio',
        text,
        html
      });
      return { ok: true, id: info.messageId || 'gmail-smtp' };
    } catch (error) {
      console.error('Gmail SMTP delivery failed:', String(error?.code || 'smtp_error'), String(error?.message || 'Email göndərilmədi').slice(0, 220));
      // If Resend is also configured, try it before falling back to a local link.
      // This keeps a broken Gmail app-password from silently bypassing the backup provider.
      const canTryResend = Boolean(RESEND_API_KEY && EMAIL_FROM &&
        (/^[^<>]+<[^<>@\s]+@[^<>\s]+>$/.test(EMAIL_FROM) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EMAIL_FROM)));
      if (!canTryResend) {
        const reason = String(error?.message || '');
        const missingTransport = error?.code === 'ERR_MODULE_NOT_FOUND' && /nodemailer/i.test(reason);
        const fallback = developmentVerificationFallback(user, rawToken, `Gmail SMTP ${error?.code || ''} ${reason}`);
        if (fallback) return fallback;
        if (missingTransport) {
          return { ok: false, code: 'email_dependency_missing', message: 'Server e-poçt göndərmə paketini tapa bilmədi. Layihə qovluğunda npm install əmrini icra et və serveri yenidən başlat.' };
        }
        return { ok: false, code: 'gmail_delivery_failed', message: 'Gmail məktubu qəbul etmədi. Gmail tətbiq şifrəsini və internet bağlantısını yoxla; server jurnalındakı SMTP xətası səbəbi göstərəcək.' };
      }
      console.warn('Gmail SMTP uğursuz oldu; Resend ehtiyat göndərişi sınanacaq.');
    }
  }

  if (!RESEND_API_KEY) {
    const fallback = developmentVerificationFallback(user, rawToken, 'Email provider is not configured');
    if (fallback) return fallback;
    return { ok: false, code: 'email_not_configured', message: 'Təsdiq məktubu hazırda göndərilə bilmir. Bir az sonra yenidən cəhd et.' };
  }
  if (!EMAIL_FROM || !/^[^<>]+<[^<>@\s]+@[^<>\s]+>$/.test(EMAIL_FROM) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EMAIL_FROM)) {
    const fallback = developmentVerificationFallback(user, rawToken, 'EMAIL_FROM is invalid');
    if (fallback) return fallback;
    return { ok: false, code: 'email_sender_not_configured', message: 'Təsdiq məktubu üçün göndərici məlumatı təsdiqlənməyib. Bir az sonra yenidən cəhd et.' };
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: EMAIL_FROM, to: [user.email], subject: 'E-poçt ünvanını təsdiqlə — Signal Studio', html, text }),
      signal: AbortSignal.timeout(12000)
    });
    const detail = await response.json().catch(() => ({}));
    if (!response.ok) {
      const providerCode = String(detail.name || detail.code || '').toLowerCase();
      const providerMessage = String(detail.message || detail.error || '').slice(0, 500);
      console.error('Resend delivery error:', response.status, providerCode || 'provider_error', providerMessage || '(no detail)');
      const normalized = `${providerCode} ${providerMessage}`.toLowerCase();
      let message = 'Təsdiq məktubu göndərilə bilmədi. Bir az sonra yenidən cəhd et.';
      let code = 'email_delivery_failed';
      if (response.status === 401) {
        code = 'email_provider_auth_failed';
        message = 'E-poçt xidməti hazırda təsdiq sorğusunu qəbul etmir. Bir az sonra yenidən cəhd et.';
      } else if (/domain_not_verified|verify.*domain|domain.*not.*verified|testing emails to your own|only send.*own email|restricted.*recipient/.test(normalized) || response.status === 403) {
        code = 'email_sender_or_domain_not_verified';
        message = 'Resend test rejimində yalnız icazəli alıcıya göndərməyə icazə verə bilər. Domeni Resend-də təsdiqlə və ya Gmail SMTP qur.';
      } else if (/invalid_from|invalid.*sender|from.*address/.test(normalized)) {
        code = 'email_sender_not_configured';
        message = 'Təsdiq məktubu üçün göndərici ünvanı təsdiqlənməyib. Bir az sonra yenidən cəhd et.';
      } else if (response.status === 429) {
        code = 'email_provider_rate_limited';
        message = 'Resend göndəriş limitinə çatılıb. Bir az sonra yenidən cəhd et.';
      }
      const fallback = developmentVerificationFallback(user, rawToken, `${response.status} ${providerCode} ${providerMessage}`);
      if (fallback) return fallback;
      return { ok: false, code, message };
    }
    return { ok: true, id: detail.id };
  } catch (error) {
    console.error('Resend request failed:', error.message);
    const fallback = developmentVerificationFallback(user, rawToken, error.message || 'provider unreachable');
    if (fallback) return fallback;
    return { ok: false, code: 'email_provider_unreachable', message: 'Email servisinə qoşulmaq mümkün olmadı. Şəbəkəni və Resend statusunu yoxlayıb yenidən cəhd edin.' };
  }
}
function supabaseUserMetadata(user) {
  return {
    name: user.name,
    full_name: user.name,
    profile_type: user.profileType || 'creator',
    signal_user_id: user.id,
    referral_code: user.referralCode || ''
  };
}

async function supabaseAdminRequest(path, { method = 'GET', body } = {}) {
  if (!SUPABASE_AUTH_CONFIGURED) throw new Error('Supabase Auth is not configured.');
  const headers = { apikey: SUPABASE_ADMIN_KEY, 'Content-Type': 'application/json' };
  // New sb_secret_* API keys are opaque, not JWTs. Never send one as Bearer. If a
  // project exposes a legacy service_role JWT, use it for GoTrue Auth Admin writes
  // as a compatibility fallback; otherwise send only the new secret API key.
  // Mirror the official Supabase client: send the API key and a Bearer credential.
  // For new sb_secret_* keys this is not a user JWT; Supabase's gateway supports it
  // as the server credential for trusted server-side Auth Admin operations. If a legacy
  // service_role JWT is available, use that as Bearer for backwards compatibility.
  headers.Authorization = `Bearer ${SUPABASE_LEGACY_SERVICE_ROLE_JWT || SUPABASE_ADMIN_KEY}`;
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(15000)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(String(payload.msg || payload.message || payload.error_description || payload.error || `Supabase Auth HTTP ${response.status}`).slice(0, 500));
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

async function findSupabaseAuthUserByEmail(email) {
  // Admin user pagination is capped by Supabase; paginate to avoid missing an existing account.
  for (let page = 1; page <= 10; page++) {
    const result = await supabaseAdminRequest(`/auth/v1/admin/users?page=${page}&per_page=1000`);
    const users = Array.isArray(result.users) ? result.users : [];
    const match = users.find(item => String(item.email || '').toLowerCase() === email.toLowerCase());
    if (match) return match;
    if (users.length < 1000) return null;
  }
  return null;
}

async function ensureSupabaseAuthUser(user, password) {
  if (!SUPABASE_AUTH_CONFIGURED) return { configured: false };
  const metadata = supabaseUserMetadata(user);
  let remoteUser;
  if (user.supabaseAuthUserId) {
    remoteUser = await supabaseAdminRequest(`/auth/v1/admin/users/${encodeURIComponent(user.supabaseAuthUserId)}`, {
      method: 'PUT', body: { password, user_metadata: metadata, ...(user.verified ? { email_confirm: true } : {}) }
    });
  } else {
    try {
      remoteUser = await supabaseAdminRequest('/auth/v1/admin/users', {
        method: 'POST', body: { email: user.email, password, email_confirm: Boolean(user.verified), user_metadata: metadata }
      });
    } catch (error) {
      // A previous attempt may already have created the Supabase user before the app restarted.
      if (![400, 409, 422].includes(error.status)) throw error;
      const existing = await findSupabaseAuthUserByEmail(user.email);
      if (!existing?.id) throw error;
      remoteUser = await supabaseAdminRequest(`/auth/v1/admin/users/${encodeURIComponent(existing.id)}`, {
        method: 'PUT', body: { password, user_metadata: metadata, ...(user.verified ? { email_confirm: true } : {}) }
      });
    }
  }
  remoteUser = remoteUser?.user || remoteUser;
  if (!remoteUser?.id) throw new Error('Supabase Auth did not return a user ID.');
  user.supabaseAuthUserId = remoteUser.id;
  persist();
  return { configured: true, id: remoteUser.id };
}

async function issueVerification(user) {
  const raw = randomBytes(32).toString('base64url');
  user.verifyTokenHash = tokenHash(raw);
  user.verifyExpiresAt = Date.now() + VERIFICATION_TTL_MS;
  persist();
  const delivery = await sendVerificationEmail(user, raw);
  return delivery;
}
function requireUser(req, res) {
  const user = getSessionUser(req);
  if (!user) { json(res, 401, { ok: false, code: 'auth_required', message: 'Davam etmək üçün hesabına daxil ol.' }); return null; }
  return user;
}
function requirePlan(req, res, requiredPlan) {
  const user = requireUser(req, res);
  if (!user) return null;
  const rank = { free: 0, go: 1, pro: 2 };
  if ((rank[String(user.plan || 'free').toLowerCase()] ?? 0) < (rank[requiredPlan] ?? 0)) {
    json(res, 403, { ok: false, code: 'plan_upgrade_required', requiredPlan, message: requiredPlan === 'pro' ? 'Bu funksiya Pro planında mövcuddur.' : 'Bu funksiya Go planından başlayaraq mövcuddur.' });
    return null;
  }
  return user;
}

async function completeEmailVerification(raw) {
  if (raw.length < 30 || raw.length > 200) {
    return { ok: false, status: 400, code: 'invalid_verification_link', message: 'Təsdiq linki düzgün deyil. Ana səhifəyə qayıdıb yeni təsdiq məktubu istə.' };
  }
  const hash = tokenHash(raw);
  const user = db.users.find(u => u.verifyTokenHash === hash && u.verifyExpiresAt > Date.now());
  if (!user) {
    return { ok: false, status: 400, code: 'verification_expired', message: 'Təsdiq linkinin vaxtı bitib və ya artıq istifadə olunub. Hesaba daxil ol; alınmasa, yeni təsdiq məktubu istə.' };
  }
  let supabaseSyncWarning = false;
  if (SUPABASE_AUTH_CONFIGURED) {
    if (!user.supabaseAuthUserId) {
      // Local email verification is the source of truth for this app's own session.
      // Older local accounts may not have a linked Supabase identity; don't strand
      // the user on a confirmation page because of an optional remote sync.
      supabaseSyncWarning = true;
      console.warn(`Supabase confirmation sync skipped for ${user.email}: no linked Supabase user ID.`);
    } else {
      try {
        await supabaseAdminRequest(`/auth/v1/admin/users/${encodeURIComponent(user.supabaseAuthUserId)}`, {
          method: 'PUT', body: { email_confirm: true, user_metadata: supabaseUserMetadata(user) }
        });
      } catch (error) {
        // A valid one-time email token proves mailbox access. Keep the local app usable
        // if Supabase's admin endpoint rejects a credential; retry remote sync on login.
        supabaseSyncWarning = true;
        console.error('Supabase email confirmation sync failed; local verification will continue:', error.message);
      }
    }
  }
  user.verified = true;
  user.verifiedAt = new Date().toISOString();
  user.verifyTokenHash = '';
  user.verifyExpiresAt = 0;
  if (user.referredBy && !user.referralRewardProcessed) {
    const referrer = db.users.find(u => u.id === user.referredBy && u.verified && u.id !== user.id);
    if (referrer) {
      user.rewardPoints = (Number(user.rewardPoints) || 0) + 25;
      referrer.rewardPoints = (Number(referrer.rewardPoints) || 0) + 100;
      user.referralRewardProcessed = true;
      db.referralEvents.push({ id: randomUUID(), referrerId: referrer.id, referredUserId: user.id, verifiedAt: user.verifiedAt, points: 100 });
    } else user.referredBy = '';
  }
  const rawSession = randomBytes(32).toString('base64url');
  db.sessions = db.sessions.filter(s => s.userId !== user.id && s.expiresAt > Date.now());
  db.sessions.push({ id: randomUUID(), userId: user.id, tokenHash: tokenHash(rawSession), createdAt: Date.now(), expiresAt: Date.now() + SESSION_TTL_MS });
  persist();
  return { ok: true, user: safeUser(user), cookie: cookieHeader(rawSession, SESSION_TTL_MS), supabaseSyncWarning };
}

const APIFY_ACTORS = Object.freeze({
  instagram: 'apify~instagram-reel-scraper',
  facebook: 'apify~facebook-posts-scraper',
  tiktok: 'clockworks~tiktok-scraper',
  youtube: 'streamers~youtube-shorts-scraper',
  linkedin: 'coregent~linkedin-posts-search-scraper'
});

function parsePublicTarget(platform, raw) {
  const target = normalizeText(raw, 500);
  if (!target) throw Object.assign(new Error('Platforma üçün profil/kanal URL-i və ya axtarış sözü daxil et.'), { status: 400, code: 'missing_target' });
  if (platform === 'linkedin') {
    if (target.length < 2) throw Object.assign(new Error('LinkedIn axtarışı üçün ən azı 2 simvol daxil et.'), { status: 400, code: 'invalid_target' });
    return target;
  }
  if (platform === 'instagram' && /^@?[\w.]{1,30}$/.test(target)) return target.replace(/^@/, '');
  if (platform === 'youtube' && /^@?[\w.-]{2,100}$/.test(target) && !target.includes('/')) return target.replace(/^@/, '');
  if (platform === 'tiktok' && /^@?[\w.]{2,30}$/.test(target) && !target.includes('/')) return target.replace(/^@/, '');
  let parsed;
  try { parsed = new URL(/^https?:\/\//i.test(target) ? target : `https://${target}`); }
  catch { throw Object.assign(new Error('Daxil edilən URL düzgün deyil.'), { status: 400, code: 'invalid_target' }); }
  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const allowedHosts = {
    instagram: ['instagram.com'],
    facebook: ['facebook.com', 'fb.watch'],
    youtube: ['youtube.com', 'youtu.be'],
    tiktok: ['tiktok.com'],
  };
  if (!allowedHosts[platform]?.includes(host) || (parsed.protocol !== 'https:' && parsed.protocol !== 'http:')) {
    throw Object.assign(new Error(platform === 'instagram' ? 'Instagram username, instagram.com profil və ya Reel URL-i daxil et.' : platform === 'facebook' ? 'Facebook-da açıq Page URL-i daxil et. Şəxsi profillər bu scraper tərəfindən dəstəklənmir.' : platform === 'youtube' ? 'YouTube kanalının URL-ini və ya @handle daxil et.' : 'TikTok profil URL-ini və ya username daxil et.'), { status: 400, code: 'invalid_target' });
  }
  return parsed.toString();
}

function safeExternalUrl(value, allowedHosts = []) {
  if (typeof value !== 'string' || value.length > 2000) return '';
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    return allowedHosts.some(allowed => host === allowed || host.endsWith(`.${allowed}`)) ? parsed.toString() : '';
  } catch { return ''; }
}
function pickCount(...values) {
  for (const value of values) { const n = Number(value); if (Number.isFinite(n) && n >= 0) return Math.min(1e12, Math.round(n)); }
  return 0;
}
function cleanTags(value) {
  if (Array.isArray(value)) return value.filter(v => typeof v === 'string').map(v => normalizeText(v.replace(/^#/, ''), 80)).filter(Boolean).slice(0, 40);
  if (typeof value === 'string') return value.split(/[ ,]+/).map(v => normalizeText(v.replace(/^#/, ''), 80)).filter(Boolean).slice(0, 40);
  return [];
}
function safeSourceSnapshot(value, depth = 0) {
  if (value === null || typeof value === 'boolean' || typeof value === 'number') return value;
  if (typeof value === 'string') return value.length > 5000 ? `${value.slice(0, 5000)}… [truncated]` : value;
  if (depth >= 5) return '[nested data omitted at depth limit]';
  if (Array.isArray(value)) return value.slice(0, 60).map(item => safeSourceSnapshot(item, depth + 1));
  if (typeof value === 'object') {
    const result = Object.create(null);
    for (const [key, child] of Object.entries(value).slice(0, 100)) {
      if (['__proto__', 'prototype', 'constructor'].includes(key)) continue;
      result[String(key).slice(0, 100)] = safeSourceSnapshot(child, depth + 1);
    }
    return result;
  }
  return String(value).slice(0, 200);
}

function normalizeApifyRows(platform, rows, userId) {
  const now = new Date().toISOString();
  const getText = (...values) => values.find(v => typeof v === 'string' && v.trim()) || '';
  return rows.filter(row => row && typeof row === 'object' && !row.error).map(row => {
    let publishedAt = getText(row.timestamp, row.publishedAt, row.uploadDate, row.postedAt, row.date, row.createTimeISO, row.createdAt, row.datePublished, row.createTime);
    if (publishedAt && Number.isFinite(Number(publishedAt)) && /^\d{9,13}$/.test(String(publishedAt))) { const stamp = Number(publishedAt); publishedAt = new Date(String(publishedAt).length <= 10 ? stamp * 1000 : stamp).toISOString(); }
    if (publishedAt && Number.isNaN(new Date(publishedAt).getTime())) publishedAt = '';
    const common = {
      id: randomUUID(), userId, platform: ({ instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok', youtube: 'YouTube', linkedin: 'LinkedIn' })[platform],
      publishedAt: publishedAt || null,
      title: normalizeText(getText(row.caption, row.title, row.postText, row.text, row.description, row.headline, row.name), 300),
      views: 0, likes: 0, comments: 0, shares: 0, saves: 0,
      source: `apify:${platform}`, createdAt: now
    };
    let details;
    if (platform === 'instagram') {
      const url = safeExternalUrl(getText(row.url, row.inputUrl, row.redirectedFromUrl, row.permalink) || (row.shortCode ? `https://www.instagram.com/reel/${encodeURIComponent(row.shortCode)}/` : ''), ['instagram.com']);
      details = {
        url, caption: normalizeText(getText(row.caption, row.alt), 12000), author: normalizeText(getText(row.ownerUsername, row.ownerFullName, row.username), 150),
        hashtags: cleanTags(row.hashtags), views: pickCount(row.videoPlayCount, row.igPlayCount, row.videoViewCount), likes: pickCount(row.likesCount, row.likeCount),
        comments: pickCount(row.commentsCount, row.commentCount), shares: pickCount(row.sharesCount, row.reshareCount), durationSeconds: pickCount(row.videoDuration),
        transcript: normalizeText(getText(row.transcript), 12000), thumbnailUrl: safeExternalUrl(getText(row.displayUrl, row.thumbnailUrl), ['cdninstagram.com', 'fbcdn.net', 'instagram.com']),
        videoUrl: safeExternalUrl(getText(row.videoUrl), ['cdninstagram.com', 'fbcdn.net', 'instagram.com']), type: normalizeText(getText(row.type, row.productType), 40),
        shortcode: normalizeText(getText(row.shortCode), 100), audio: normalizeText(getText(row.musicInfo?.song_name, row.musicInfo?.artist_name, row.audioTitle), 300)
      };
      common.views = details.views; common.likes = details.likes; common.comments = details.comments; common.shares = details.shares;
    } else if (platform === 'facebook') {
      const url = safeExternalUrl(getText(row.url, row.postUrl, row.permalink, row.postUrl), ['facebook.com', 'fb.watch']);
      details = { url, caption: normalizeText(getText(row.text, row.message, row.postText, row.caption, row.title), 12000), author: normalizeText(getText(row.pageName, row.pageTitle, row.author, row.profileName), 180),
        hashtags: cleanTags(row.hashtags), views: pickCount(row.videoViewCount, row.views, row.viewCount, row.videoViews), likes: pickCount(row.likesCount, row.likes, row.reactionsCount, row.likes),
        comments: pickCount(row.commentsCount, row.comments), shares: pickCount(row.sharesCount, row.shares, row.shareCount), durationSeconds: pickCount(row.videoDuration),
        transcript: normalizeText(getText(row.transcript, row.videoTranscript), 12000), thumbnailUrl: safeExternalUrl(getText(row.thumbnail, row.imageUrl, row.media?.thumbnail), ['fbcdn.net', 'facebook.com']), videoUrl: safeExternalUrl(getText(row.videoUrl, row.media?.url), ['fbcdn.net', 'facebook.com']) };
      common.views=details.views; common.likes=details.likes; common.comments=details.comments; common.shares=details.shares;
    } else if (platform === 'youtube') {
      const id = normalizeText(getText(row.id, row.videoId), 100);
      const url = safeExternalUrl(getText(row.url, row.videoUrl, row.link) || (id ? `https://www.youtube.com/shorts/${encodeURIComponent(id)}` : ''), ['youtube.com', 'youtu.be']);
      details = { url, caption: normalizeText(getText(row.description, row.title), 12000), author: normalizeText(getText(row.channelName, row.channelTitle, row.channel, row.author), 180),
        hashtags: cleanTags(row.hashtags), views: pickCount(row.viewCount, row.views, row.videoViewCount), likes: pickCount(row.likes, row.likesCount, row.likeCount),
        comments: pickCount(row.commentsCount, row.commentCount, row.comments), shares: pickCount(row.sharesCount), durationSeconds: pickCount(row.durationSeconds, row.duration), transcript: normalizeText(getText(row.transcript), 12000),
        thumbnailUrl: safeExternalUrl(getText(row.thumbnailUrl, row.thumbnail, row.thumbnailUrl), ['ytimg.com', 'youtube.com']), videoUrl: url, type: normalizeText(getText(row.type), 40), channelId: normalizeText(getText(row.channelId), 180) };
      common.views=details.views; common.likes=details.likes; common.comments=details.comments; common.shares=details.shares;
    } else if (platform === 'tiktok') {
      const id = normalizeText(getText(row.id, row.aweme_id, row.videoId), 100);
      const url = safeExternalUrl(getText(row.webVideoUrl, row.url, row.videoUrl, row.shareUrl) || (id ? `https://www.tiktok.com/video/${encodeURIComponent(id)}` : ''), ['tiktok.com']);
      details = { url, caption: normalizeText(getText(row.text, row.desc, row.title), 12000), author: normalizeText(getText(row.authorMeta?.name, row.authorMeta?.nickName, row.author, row.username), 180),
        hashtags: cleanTags(row.hashtags || ((getText(row.text, row.desc).match(/#[\p{L}\p{N}_]+/gu)) || [])), views: pickCount(row.playCount, row.play_count, row.views, row.viewCount), likes: pickCount(row.diggCount, row.digg_count, row.likes, row.likesCount),
        comments: pickCount(row.commentCount, row.comment_count, row.comments, row.commentsCount), shares: pickCount(row.shareCount, row.share_count, row.shares), durationSeconds: pickCount(row.videoMeta?.duration, row.duration), transcript: normalizeText(getText(row.transcript, row.subtitle), 12000),
        thumbnailUrl: safeExternalUrl(getText(row.videoMeta?.coverUrl, row.coverUrl, row.thumbnail, row.thumbnailUrl), ['tiktokcdn.com', 'tiktok.com']), videoUrl: safeExternalUrl(getText(row.videoUrl, row.downloadUrl), ['tiktokcdn.com', 'tiktok.com']) };
      common.views=details.views; common.likes=details.likes; common.comments=details.comments; common.shares=details.shares;
    } else {
      const url = safeExternalUrl(getText(row.url, row.postUrl, row.link), ['linkedin.com']);
      details = { url, caption: normalizeText(getText(row.text, row.content, row.postText, row.title), 12000), author: normalizeText(getText(row.authorName, row.author, row.profileName, row.name), 180),
        hashtags: cleanTags(row.hashtags), views: pickCount(row.views, row.viewCount), likes: pickCount(row.reactions, row.reactionCount, row.likes, row.likesCount),
        comments: pickCount(row.comments, row.commentsCount, row.commentCount), shares: pickCount(row.reposts, row.repostsCount, row.sharesCount), durationSeconds: 0, transcript: '',
        thumbnailUrl: safeExternalUrl(getText(row.image, row.imageUrl, row.thumbnailUrl), ['licdn.com', 'linkedin.com']), videoUrl: '' };
      common.views=details.views; common.likes=details.likes; common.comments=details.comments; common.shares=details.shares;
    }
    common.title ||= `${common.platform} post`;
    common.details = details;
    common.sourceData = safeSourceSnapshot(row);
    return common;
  });
}

async function runApifyActor(actorId, input, maxItems) {
  if (!APIFY_API_TOKEN) throw Object.assign(new Error('Bu platforma üzrə məlumat mənbəyi hazırda əlçatan deyil.'), { status: 503, code: 'apify_not_configured' });
  let response;
  try {
    response = await fetch(`https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?clean=true&format=json&limit=${maxItems}&timeout=180`, {
      method: 'POST', headers: { 'Authorization': `Bearer ${APIFY_API_TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(input), signal: AbortSignal.timeout(185000)
    });
  } catch (error) {
    throw Object.assign(new Error(error.name === 'TimeoutError' ? 'Apify sorğusu vaxt limitini keçdi. Nəticə sayını azalt və yenidən yoxla.' : 'Apify serverinə qoşulmaq mümkün olmadı. Şəbəkəni yoxla.'), { status: 502, code: 'apify_connection_failed' });
  }
  const text = await response.text();
  let payload;
  try { payload = text ? JSON.parse(text) : []; } catch { payload = { message: text.slice(0, 1000) }; }
  if (!response.ok) {
    const message = response.status === 401 || response.status === 403 ? 'Apify tokeni qəbul edilmədi. Apify Console → Settings → API & Integrations bölməsindən tokeni yenilə.'
      : response.status === 402 ? 'Apify hesabının kredit/balans limiti çatmır. Apify billing və Actor pricing bölməsini yoxla.'
      : response.status === 408 || response.status === 504 ? 'Apify Actor vaxtında bitmədi. Nəticə sayını azaldıb yenidən sına.'
      : response.status === 404 ? 'Apify Actor tapılmadı və ya bu hesabın həmin Actor-a çıxışı yoxdur.'
      : normalizeText(payload?.error?.message || payload?.message, 500) || `Apify sorğusu uğursuz oldu (HTTP ${response.status}).`;
    throw Object.assign(new Error(message), { status: response.status === 401 || response.status === 402 ? 503 : 502, code: 'apify_actor_failed' });
  }
  const rows = Array.isArray(payload) ? payload : Array.isArray(payload?.items) ? payload.items : Array.isArray(payload?.data) ? payload.data : [];
  return rows.slice(0, maxItems);
}

async function handleSocialScrape(req, res) {
  const user = requirePlan(req, res, 'go'); if (!user) return;
  if (rateLimited(req, `apify-scrape:${user.id}`, 3, 60 * 60 * 1000)) return json(res, 429, { ok: false, code: 'apify_rate_limited', message: 'Apify sorğusu saatlıq limitinə çatdın. Xərclərə nəzarət üçün saat ərzində maksimum 3 sorğu icazəlidir.' });
  const input = await bodyJson(req, 24 * 1024);
  const platform = normalizeText(input.platform, 30).toLowerCase();
  if (!Object.hasOwn(APIFY_ACTORS, platform)) return json(res, 400, { ok: false, code: 'invalid_platform', message: 'Dəstəklənən platformanı seç: Instagram, Facebook, TikTok, YouTube və ya LinkedIn.' });
  const limit = Math.max(1, Math.min(50, Math.round(Number(input.limit) || 10)));
  let target;
  try { target = parsePublicTarget(platform, input.target); }
  catch (error) { return json(res, error.status || 400, { ok: false, code: error.code || 'invalid_target', message: error.message }); }
  const actorInput = platform === 'instagram'
    ? { username: [target], resultsLimit: limit, includeTranscript: Boolean(input.includeTranscript), includeSharesCount: false, skipPinnedPosts: false }
    : platform === 'facebook'
      ? { startUrls: [{ url: target }], resultsLimit: limit, captionText: Boolean(input.includeTranscript) }
      : platform === 'tiktok'
        ? { profiles: [target], profileScrapeSections: ['videos'], resultsPerPage: limit, maxFollowersPerProfile: 0, maxFollowingPerProfile: 0, commentsPerPost: 0, topLevelCommentsPerPost: 0, maxRepliesPerComment: 0 }
        : platform === 'youtube'
          ? { channels: [target], maxResultsShorts: limit, oldestPostDate: '2020-01-01' }
          : { queries: [target], maxResultsPerQuery: limit, proxyConfiguration: { useApifyProxy: true } };
  try {
    const rows = await runApifyActor(APIFY_ACTORS[platform], actorInput, limit);
    if (rows.length && rows.every(row => row && row.error)) { const actorError = normalizeText(rows[0].error || rows[0].note || 'Actor public nəticə qaytarmadı.', 300); throw Object.assign(new Error(`Apify nəticə xətası: ${actorError}. Profil/kanal URL-ini və Actor inputunu yoxla.`), { status: 502, code: 'apify_no_public_results' }); }
    const normalized = normalizeApifyRows(platform, rows, user.id);
    const existingUrls = new Set(db.metrics.filter(m => m.userId === user.id && m.platform === ({instagram:'Instagram',facebook:'Facebook',tiktok:'TikTok',youtube:'YouTube',linkedin:'LinkedIn'})[platform]).map(m => m.details?.url).filter(Boolean));
    let imported = 0, duplicates = 0;
    for (const item of normalized) {
      const url = item.details?.url;
      if (url && existingUrls.has(url)) { duplicates++; continue; }
      if (url) existingUrls.add(url);
      db.metrics.push(item); imported++;
    }
    if (db.metrics.length > 150000) db.metrics = db.metrics.slice(-150000);
    if (imported) persist();
    return json(res, 200, {
      ok: true, platform, source: `apify:${platform}`, sourceLabel: `Apify · ${platform}`,
      fetchedAt: new Date().toISOString(), target, requested: limit, resultCount: normalized.length,
      imported, duplicates, items: normalized, rawDataDisclaimer: 'Bu nəticələr seçilmiş Apify Actor-un həmin anda qaytardığı public data-dır. Private account insights və tam tarixçə zəmanəti deyil.'
    });
  } catch (error) {
    console.error(`Apify ${platform} scrape failed (HTTP ${error.status || 'network'}; code ${error.code || 'unknown'}):`, error.message);
    return json(res, error.status || 502, { ok: false, code: error.code || 'apify_actor_failed', message: error.message || 'Apify məlumatı əldə etmək mümkün olmadı.' });
  }
}

async function readRawBody(req, maxBytes = 1024 * 1024) {
  const chunks = []; let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) throw Object.assign(new Error('Sorğu ölçüsü çox böyükdür.'), { status: 413, code: 'body_too_large' });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
async function stripeApi(path, { method = 'GET', params = null } = {}) {
  if (!STRIPE_SECRET_KEY) throw Object.assign(new Error('Ödəniş xidməti hazırda əlçatan deyil.'), { status: 503, code: 'stripe_not_configured' });
  const init = { method, headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` }, signal: AbortSignal.timeout(15000) };
  if (params) { init.headers['Content-Type'] = 'application/x-www-form-urlencoded'; init.body = new URLSearchParams(params).toString(); }
  let response;
  try { response = await fetch(`https://api.stripe.com/v1${path}`, init); }
  catch { throw Object.assign(new Error('Ödəniş provayderinə qoşulmaq mümkün olmadı. Bir az sonra yenidən cəhd et.'), { status: 502, code: 'stripe_unreachable' }); }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = response.status === 401 ? 'Ödəniş xidməti ilə autentifikasiya alınmadı.' : response.status === 429 ? 'Ödəniş xidməti müvəqqəti limitə çatıb.' : 'Ödəniş sorğusu tamamlana bilmədi.';
    throw Object.assign(new Error(message), { status: response.status === 401 ? 503 : 502, code: 'stripe_request_failed' });
  }
  return payload;
}
async function stripePriceForPlan(plan) {
  const id = plan === 'go' ? STRIPE_PRICE_GO : plan === 'pro' ? STRIPE_PRICE_PRO : '';
  if (!id) throw Object.assign(new Error('Bu plan üçün ödəniş qiyməti hazırda əlçatan deyil.'), { status: 503, code: 'stripe_price_missing' });
  const price = await stripeApi(`/prices/${encodeURIComponent(id)}`);
  const expected = plan === 'go' ? 900 : 1900;
  if (!price.active || price.currency !== 'usd' || price.unit_amount !== expected || price.recurring?.interval !== 'month') {
    throw Object.assign(new Error('Ödəniş planının qiymət sazlaması ilə uyğunluğu təsdiqlənmədi.'), { status: 503, code: 'stripe_price_mismatch' });
  }
  return price;
}
function setUserPlanFromSubscription(user, plan, subscription) {
  const normalized = ['go','pro'].includes(plan) ? plan : 'free';
  user.plan = normalized;
  if (subscription?.customer) user.stripeCustomerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  if (subscription?.id) user.stripeSubscriptionId = subscription.id;
  if (normalized === 'free' && subscription?.status === 'canceled') user.stripeSubscriptionId = '';
  user.planUpdatedAt = new Date().toISOString();
}
function validStripeSignature(rawBody, signatureHeader) {
  if (!STRIPE_WEBHOOK_SECRET || !signatureHeader) return false;
  const fields = Object.fromEntries(String(signatureHeader).split(',').map(part => part.trim().split('=').slice(0,2)));
  const timestamp = Number(fields.t); const v1 = fields.v1;
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 300 || !v1 || !/^[a-f0-9]{64}$/i.test(v1)) return false;
  const expected = createHmac('sha256', STRIPE_WEBHOOK_SECRET).update(`${timestamp}.${rawBody}`).digest();
  const candidate = Buffer.from(v1, 'hex');
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
async function handleStripeWebhook(req, res) {
  if (!STRIPE_WEBHOOK_SECRET) return json(res, 503, { ok: false, code: 'stripe_webhook_not_configured', message: 'Webhook endpoint hazırda əlçatan deyil.' });
  let raw; try { raw = await readRawBody(req, 1024 * 1024); } catch (error) { return json(res, error.status || 400, { ok: false, code: error.code || 'webhook_body_error', message: error.message }); }
  if (!validStripeSignature(raw, req.headers['stripe-signature'])) return json(res, 400, { ok: false, code: 'invalid_stripe_signature', message: 'Webhook imzası doğrulanmadı.' });
  let event; try { event = JSON.parse(raw); } catch { return json(res, 400, { ok: false, code: 'invalid_webhook_json', message: 'Webhook JSON formatı düzgün deyil.' }); }
  const object = event?.data?.object;
  if (event.type === 'checkout.session.completed' && object?.mode === 'subscription') {
    const user = db.users.find(item => item.id === object.client_reference_id && item.id === object.metadata?.userId);
    if (user && ['paid','no_payment_required'].includes(object.payment_status)) {
      const subscriptionId = typeof object.subscription === 'string' ? object.subscription : object.subscription?.id;
      if (subscriptionId) {
        try {
          const subscription = await stripeApi(`/subscriptions/${encodeURIComponent(subscriptionId)}`);
          setUserPlanFromSubscription(user, object.metadata?.plan || subscription.metadata?.plan, subscription); persist();
        } catch (error) { console.error('Stripe webhook subscription lookup failed:', error.code || 'stripe_error'); }
      }
    }
  } else if (['customer.subscription.updated','customer.subscription.deleted'].includes(event.type)) {
    const subscription = object || {};
    const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
    const user = db.users.find(item => item.id === subscription.metadata?.userId || (customerId && item.stripeCustomerId === customerId));
    if (user) {
      const active = ['active','trialing'].includes(subscription.status) && event.type !== 'customer.subscription.deleted';
      const priceId = subscription.items?.data?.[0]?.price?.id;
      const plan = active ? (subscription.metadata?.plan || (priceId && priceId === STRIPE_PRICE_PRO ? 'pro' : 'go')) : 'free';
      setUserPlanFromSubscription(user, plan, { ...subscription, status: active ? subscription.status : 'canceled' }); persist();
    }
  }
  return json(res, 200, { received: true });
}

async function handleApi(req, res, url) {
  const path = url.pathname;
  if (req.method === 'GET' && path === '/api/health') {
    return json(res, 200, {
      ok: true, service: 'signal-studio', build: APP_BUILD,
      emailConfigured: Boolean((GMAIL_USER && GMAIL_APP_PASSWORD) || (RESEND_API_KEY && EMAIL_FROM)),
      emailProvider: GMAIL_USER && GMAIL_APP_PASSWORD ? (RESEND_API_KEY && EMAIL_FROM ? 'gmail+resend-fallback' : 'gmail') : (RESEND_API_KEY && EMAIL_FROM ? 'resend' : (GMAIL_USER || GMAIL_APP_PASSWORD || RESEND_API_KEY || EMAIL_FROM ? 'incomplete' : 'none')),
      nodemailerAvailable: (() => { try { require.resolve('nodemailer'); return true; } catch { return false; } })(),
      aiConfigured: Boolean(GROQ_API_KEY), aiProvider: 'groq', apifyConfigured: Boolean(APIFY_API_TOKEN),
      supabaseAuthConfigured: SUPABASE_AUTH_CONFIGURED,
      supabaseUrlConfigured: Boolean(SUPABASE_URL),
      envFileLoaded: ENV_FILE_LOADED,
      envConfigSource: process.env.SIGNAL_STUDIO_SKIP_DOTENV === 'true' ? 'external-environment-only' : (ENV_FILE_LOADED ? '.env-plus-environment' : 'environment-only'),
      supabaseUrlHost: (() => { try { return new URL(SUPABASE_URL).host; } catch { return null; } })(),
      supabaseKeyStatus: SUPABASE_KEY_TYPE,
      supabaseKeySource: SUPABASE_KEY_SOURCE || null,
      supabaseLegacyAdminJwtConfigured: Boolean(SUPABASE_LEGACY_SERVICE_ROLE_JWT),
      authStorage: SUPABASE_AUTH_CONFIGURED ? 'supabase-auth+local-app-data' : 'local-json-only',
      oneAccountPerIp: ONE_ACCOUNT_PER_IP, environment: NODE_ENV
    });
  }
  if (req.method === 'GET' && path === '/api/diagnostics/supabase') {
    const host = (() => { try { return new URL(SUPABASE_URL).host; } catch { return null; } })();
    if (!SUPABASE_URL || !SUPABASE_ADMIN_KEY) {
      return json(res, 503, { ok: false, reachable: false, build: APP_BUILD, urlConfigured: Boolean(SUPABASE_URL), keyConfigured: Boolean(SUPABASE_ADMIN_KEY), keyStatus: SUPABASE_KEY_TYPE, host, providerStatus: null, message: 'Supabase URL və ya server açarı yüklənməyib. Bu cavabı /api/health ilə müqayisə et.' });
    }
    try {
      // Read-only endpoint probe: never creates users or returns project settings to the client.
      const probe = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
        headers: { apikey: SUPABASE_ADMIN_KEY },
        signal: AbortSignal.timeout(10000)
      });
      await probe.arrayBuffer().catch(() => {});
      if (probe.ok) {
        return json(res, 200, { ok: true, reachable: true, build: APP_BUILD, urlConfigured: true, keyConfigured: true, keyStatus: SUPABASE_KEY_TYPE, host, providerStatus: probe.status, message: 'Supabase Auth endpoint cavab verir. İndi qeydiyyat sorğusunu sına.' });
      }
      const message = probe.status === 404
        ? 'Supabase host cavab verdi, amma Auth settings yolu 404 qaytardı. Project URL-in düzgün layihəyə aid olduğunu və layihənin aktiv olduğunu yoxla.'
        : (probe.status === 401 || probe.status === 403)
          ? 'Supabase host əlçatandır, amma API açarı qəbul edilmədi. Serverdə sb_secret_... açarını yoxla; publishable açarı server açarı kimi istifadə etmə.'
          : `Supabase Auth endpoint HTTP ${probe.status} qaytardı. Layihənin statusunu və Supabase API açarlarını yoxla.`;
      return json(res, 503, { ok: false, reachable: true, build: APP_BUILD, urlConfigured: true, keyConfigured: true, keyStatus: SUPABASE_KEY_TYPE, host, providerStatus: probe.status, message });
    } catch (error) {
      console.error(`Supabase read-only health probe failed (${host || 'unknown host'}):`, error.message);
      return json(res, 503, { ok: false, reachable: false, build: APP_BUILD, urlConfigured: true, keyConfigured: true, keyStatus: SUPABASE_KEY_TYPE, host, providerStatus: null, message: 'Signal Studio serveri Supabase Auth-a qoşula bilmədi. İnternet bağlantısını, Project URL-i və layihə statusunu yoxla.' });
    }
  }
  if (req.method === 'POST' && path === '/api/stripe/webhook') return await handleStripeWebhook(req, res);
  if (!originAllowed(req)) return json(res, 403, { ok: false, code: 'origin_not_allowed', message: 'Təhlükəsizlik yoxlaması uğursuz oldu. Səhifəni yenilə və yenidən cəhd et.' });

  if (req.method === 'GET' && path === '/api/video/status') {
    const user = requireUser(req, res); if (!user) return;
    return json(res, 200, { ok: true, aiConfigured: Boolean(GROQ_API_KEY), ffmpegAvailable: await checkFfmpeg(), maxBytes: MAX_VIDEO_BYTES, maxMinutes: 60 });
  }
  if (req.method === 'POST' && path === '/api/video/analyze') return await handleVideoApi(req, res, url);

  if (req.method === 'GET' && path === '/api/config') {
    return json(res, 200, { ok: true, groqConfigured: Boolean(GROQ_API_KEY), groqModel: GROQ_API_KEY ? GROQ_MODEL : '', groqVisionModel: GROQ_API_KEY ? GROQ_VISION_MODEL : '', trendsSourceConfigured: Boolean(TREND_RSS_URL), apifyConfigured: Boolean(APIFY_API_TOKEN), stripeConfigured: Boolean(STRIPE_SECRET_KEY && STRIPE_PRICE_GO && STRIPE_PRICE_PRO), stripeWebhookConfigured: Boolean(STRIPE_WEBHOOK_SECRET), apifyActors: { instagram: 'apify/instagram-reel-scraper', facebook: 'apify/facebook-posts-scraper', tiktok: 'clockworks/tiktok-scraper', youtube: 'streamers/youtube-shorts-scraper', linkedin: 'coregent/linkedin-posts-search-scraper' }, accountLimitEnabled: ONE_ACCOUNT_PER_IP });
  }

  if (req.method === 'GET' && path === '/api/billing/status') {
    const user = requireUser(req, res); if (!user) return;
    const used = db.aiUsage.filter(item => item.userId === user.id && Date.now() - item.at < 24 * 60 * 60 * 1000).length;
    const plan = ['free','go','pro'].includes(user.plan) ? user.plan : 'free';
    const limits = { free: 10, go: 100, pro: 400 };
    return json(res, 200, { ok: true, plan, stripeConfigured: Boolean(STRIPE_SECRET_KEY && STRIPE_PRICE_GO && STRIPE_PRICE_PRO), webhookConfigured: Boolean(STRIPE_WEBHOOK_SECRET), usage: { aiMessagesToday: used, aiMessageLimit: limits[plan] }, prices: { free: { amount: 0, currency: 'USD', interval: 'forever' }, go: { amount: 9, currency: 'USD', interval: 'month' }, pro: { amount: 19, currency: 'USD', interval: 'month' } } });
  }
  if (req.method === 'POST' && path === '/api/billing/checkout') {
    const user = requireUser(req, res); if (!user) return;
    if (rateLimited(req, `billing-checkout:${user.id}`, 8, 60 * 60 * 1000)) return json(res, 429, { ok: false, code: 'billing_rate_limited', message: 'Çox sayda ödəniş sorğusu göndərilib. Bir az sonra cəhd et.' });
    const input = await bodyJson(req, 8 * 1024); const plan = input.plan === 'pro' ? 'pro' : input.plan === 'go' ? 'go' : '';
    if (!plan) return json(res, 400, { ok: false, code: 'invalid_plan', message: 'Plan seçimi düzgün deyil.' });
    try {
      const price = await stripePriceForPlan(plan);
      const params = {
        mode: 'subscription',
        'line_items[0][price]': price.id,
        'line_items[0][quantity]': '1',
        success_url: `${BASE_URL}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}/?checkout=cancel`,
        client_reference_id: user.id,
        customer_email: user.email,
        'metadata[userId]': user.id,
        'metadata[plan]': plan,
        'subscription_data[metadata][userId]': user.id,
        'subscription_data[metadata][plan]': plan
      };
      if (user.stripeCustomerId) { delete params.customer_email; params.customer = user.stripeCustomerId; }
      const session = await stripeApi('/checkout/sessions', { method: 'POST', params });
      if (!session.url || !String(session.url).startsWith('https://')) throw Object.assign(new Error('Təhlükəsiz ödəniş səhifəsi yaradıla bilmədi.'), { status: 502, code: 'stripe_checkout_url_missing' });
      return json(res, 200, { ok: true, url: session.url, sessionId: session.id });
    } catch (error) { return json(res, error.status || 503, { ok: false, code: error.code || 'billing_unavailable', message: error.message || 'Ödənişi başlatmaq mümkün olmadı.' }); }
  }
  if (req.method === 'POST' && path === '/api/billing/confirm') {
    const user = requireUser(req, res); if (!user) return;
    const input = await bodyJson(req, 8 * 1024); const sessionId = normalizeText(input.sessionId, 200);
    if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(sessionId)) return json(res, 400, { ok: false, code: 'invalid_checkout_session', message: 'Ödəniş sessiyası düzgün deyil.' });
    try {
      const session = await stripeApi(`/checkout/sessions/${encodeURIComponent(sessionId)}`);
      if (session.client_reference_id !== user.id || session.metadata?.userId !== user.id) return json(res, 403, { ok: false, code: 'checkout_user_mismatch', message: 'Bu ödəniş sessiyası cari hesabla uyğun gəlmir.' });
      if (session.mode !== 'subscription' || session.status !== 'complete' || !['paid','no_payment_required'].includes(session.payment_status)) return json(res, 402, { ok: false, code: 'checkout_not_paid', message: 'Ödəniş hələ tamamlanmayıb.' });
      const plan = session.metadata?.plan;
      if (!['go','pro'].includes(plan)) return json(res, 400, { ok: false, code: 'checkout_plan_invalid', message: 'Ödəniş planı təsdiqlənmədi.' });
      const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
      if (!subscriptionId) return json(res, 402, { ok: false, code: 'subscription_missing', message: 'Abunəlik təsdiqlənmədi.' });
      const subscription = await stripeApi(`/subscriptions/${encodeURIComponent(subscriptionId)}`);
      if (!['active','trialing'].includes(subscription.status)) return json(res, 402, { ok: false, code: 'subscription_inactive', message: 'Abunəliyin aktiv statusu təsdiqlənmədi.' });
      setUserPlanFromSubscription(user, plan, subscription); persist();
      return json(res, 200, { ok: true, user: safeUser(user), plan });
    } catch (error) { return json(res, error.status || 503, { ok: false, code: error.code || 'billing_confirmation_failed', message: error.message || 'Ödəniş təsdiqlənə bilmədi.' }); }
  }
  if (req.method === 'POST' && path === '/api/billing/portal') {
    const user = requireUser(req, res); if (!user) return;
    if (!user.stripeCustomerId) return json(res, 409, { ok: false, code: 'stripe_customer_missing', message: 'Bu hesabda hələ aktiv ödəniş abunəliyi yoxdur.' });
    try {
      const portal = await stripeApi('/billing_portal/sessions', { method: 'POST', params: { customer: user.stripeCustomerId, return_url: `${BASE_URL}/?billing=return` } });
      if (!portal.url || !String(portal.url).startsWith('https://')) throw Object.assign(new Error('Ödəniş idarəetmə səhifəsi yaradıla bilmədi.'), { status: 502, code: 'stripe_portal_url_missing' });
      return json(res, 200, { ok: true, url: portal.url });
    } catch (error) { return json(res, error.status || 503, { ok: false, code: error.code || 'billing_portal_failed', message: error.message || 'Abunəliyi idarə etmək mümkün olmadı.' }); }
  }

  if (req.method === 'POST' && path === '/api/integrations/scrape') return await handleSocialScrape(req, res);


  if (req.method === 'POST' && path === '/api/referrals/click') {
    if (rateLimited(req, 'referral-click', 60, 10 * 60 * 1000)) return json(res, 429, { ok: false, code: 'rate_limited', message: 'Çox sayda sorğu. Bir az sonra yenidən yoxla.' });
    const input = await bodyJson(req, 8 * 1024); const code = normalizeText(input.code, 40).toUpperCase();
    const referrer = db.users.find(u => u.referralCode === code && u.verified);
    if (referrer) { const now = Date.now(); db.referralClicks = db.referralClicks.filter(c => now - c.createdAt < 90 * 86400000); db.referralClicks.push({ id: randomUUID(), referrerId: referrer.id, createdAt: now, ipHash: clientIpHash(req) }); persist(); }
    return json(res, 200, { ok: true });
  }

  if (req.method === 'POST' && path === '/api/analyze-preview') {
    if (rateLimited(req, 'analyze-preview', 12, 10 * 60 * 1000)) return json(res, 429, { ok: false, code: 'preview_rate_limited', message: 'Bir neçə dəqiqə sonra yenidən analiz et.' });
    const input = await bodyJson(req, 16 * 1024);
    const text = normalizeText(input.text, 1200);
    const platform = normalizeText(input.platform, 40) || 'Instagram';
    const goal = normalizeText(input.goal, 40) || 'engagement';
    const language = ['en', 'ru'].includes(String(input.language || 'az').toLowerCase()) ? String(input.language).toLowerCase() : 'az';
    const responseLanguage = language === 'en' ? 'English' : language === 'ru' ? 'Russian' : 'Azerbaijani';
    if (text.length < 8) return json(res, 400, { ok: false, code: 'text_too_short', message: 'Daha dolğun analiz üçün ən azı bir neçə cümlə daxil et.' });
    const local = contentTextReview(text, goal);
    let result = { ok: true, title: 'Kontent keyfiyyəti', platform, goal, words: local.words, score: local.score, hook: local.hook, readability: local.readability, engagement: local.engagement, recommendations: local.recommendations, engine: 'rule_based', scoreLabel: local.score >= 75 ? 'Aydın struktur' : local.score >= 55 ? 'İnkişaf potensialı' : 'Mətnə yenidən bax', disclaimer: 'Göstəricilər mətn strukturunu qiymətləndirir, gələcək platforma performansını yox.' };
    if (GROQ_API_KEY) {
      const prompt = `Review the content text for its platform and goal. Respond entirely in ${responseLanguage}. The score must assess text structure/quality only, not real reach/engagement or future performance. Provide 0–100 structural indicators for hook/readability/engagement and 2–5 specific recommendations. JSON keys: score, hook, readability, engagement, scoreLabel, recommendations (string array). Input: ${JSON.stringify({ text, platform, goal })}`;
      try {
        const ai = await askGroq([{ role: 'system', content: `You are Signal Studio content analysis. Do not fabricate platform statistics, trends, reach, or guarantees. Output JSON only in ${responseLanguage}.` }, { role: 'user', content: prompt }]);
        const numeric = value => Number.isFinite(Number(value)) ? Math.max(0, Math.min(100, Math.round(Number(value)))) : null;
        result = { ...result, ...ai, ok: true, platform, goal, words: local.words, score: numeric(ai.score) ?? local.score, hook: numeric(ai.hook) ?? local.hook, readability: numeric(ai.readability) ?? local.readability, engagement: numeric(ai.engagement) ?? local.engagement, recommendations: Array.isArray(ai.recommendations) ? ai.recommendations.filter(v => typeof v === 'string').slice(0, 5) : local.recommendations, engine: 'groq', disclaimer: 'Bu nəticə mətnin keyfiyyətini qiymətləndirir; gələcək performans proqnozu deyil.' };
      } catch (error) { return json(res, error.status || 503, { ok: false, code: error.code || 'ai_provider_error', message: 'AI təhlili hazırda əlçatan deyil. Bir az sonra yenidən cəhd et.' }); }
    }
    return json(res, 200, result);
  }

  if (req.method === 'POST' && path === '/api/ai/chat') {
    const user = requireUser(req, res); if (!user) return;
    if (rateLimited(req, `assistant:${user.id}`, 90, 60 * 60 * 1000)) return json(res, 429, { ok: false, code: 'assistant_rate_limited', message: 'Bir saatlıq AI sorğu həddinə çatdın. Bir az sonra yenidən cəhd et.' });
    const plan = ['free','go','pro'].includes(user.plan) ? user.plan : 'free';
    const limits = { free: 10, go: 100, pro: 400 };
    const now = Date.now(); db.aiUsage = db.aiUsage.filter(item => now - item.at < 24 * 60 * 60 * 1000);
    const used = db.aiUsage.filter(item => item.userId === user.id).length;
    if (used >= limits[plan]) return json(res, 429, { ok: false, code: 'plan_ai_limit', message: `${plan === 'free' ? 'Free' : plan === 'go' ? 'Go' : 'Pro'} planının gündəlik AI mesaj limiti tamamlanıb. Planını yeniləyərək limiti artıra bilərsən.`, used, limit: limits[plan], plan });
    const input = await bodyJson(req, 24 * 1024);
    const message = normalizeText(input.message, 4000);
    const chatLanguage = ['en', 'ru'].includes(String(input.language || 'az').toLowerCase()) ? String(input.language).toLowerCase() : 'az';
    const chatLanguageName = chatLanguage === 'en' ? 'English' : chatLanguage === 'ru' ? 'Russian' : 'Azerbaijani';
    if (message.length < 2) return json(res, 400, { ok: false, code: 'message_too_short', message: 'Mesajını yaz.' });
    if (!GROQ_API_KEY) return json(res, 503, { ok: false, code: 'assistant_unavailable', message: 'AI köməkçi hazırda cavab verə bilmir. Bir az sonra yenidən cəhd et.' });
    const history = Array.isArray(input.history) ? input.history.slice(-12).filter(item => item && ['user','assistant'].includes(item.role) && typeof item.content === 'string').map(item => ({ role: item.role, content: normalizeText(item.content, 4000) })).filter(item => item.content) : [];
    // Drop duplicate final user turn if included in history; append the server-validated current message once.
    while (history.length && history.at(-1).role === 'user' && history.at(-1).content === message) history.pop();
    try {
      const messages = [
        { role: 'system', content: `You are Signal Studio's content-strategy AI assistant. Respond entirely in ${chatLanguageName}. Explain social media strategy, opening hooks, captions, calls to action, scripts, content calendars, campaigns, and reports. Give concrete examples and practical steps. Never invent platform statistics, trend results, sources, or performance forecasts; state clearly when data is missing. Do not guarantee virality or ask for passwords/API keys. Return clean Markdown or plain text.` },
        ...history,
        { role: 'user', content: message }
      ];
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: GROQ_MODEL, messages, temperature: 0.55, max_tokens: 1400 }), signal: AbortSignal.timeout(45000) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const msg = response.status === 429 ? 'AI sorğu limiti dolub. Bir az sonra yenidən cəhd et.' : 'AI köməkçi hazırda cavab verə bilmir. Bir az sonra yenidən cəhd et.';
        return json(res, 503, { ok: false, code: 'assistant_provider_error', message: msg });
      }
      const reply = String(payload.choices?.[0]?.message?.content || '').trim();
      if (!reply) return json(res, 503, { ok: false, code: 'assistant_empty_response', message: 'AI cavabı boş gəldi. Yenidən cəhd et.' });
      db.aiUsage.push({ userId: user.id, at: now, plan }); persist();
      return json(res, 200, { ok: true, reply, used: used + 1, limit: limits[plan], plan });
    } catch (error) {
      console.error('AI assistant request failed:', error.code || error.name || 'unknown');
      return json(res, 503, { ok: false, code: 'assistant_unavailable', message: 'AI köməkçi ilə əlaqə qurmaq mümkün olmadı. Yenidən cəhd et.' });
    }
  }

  if (req.method === 'POST' && path === '/api/analyze') {
    const user = requireUser(req, res); if (!user) return;
    if (rateLimited(req, 'analyze', 35, 10 * 60 * 1000)) return json(res, 429, { ok: false, code: 'rate_limited', message: 'Analiz limitinə çatdın. Bir az sonra yenidən yoxla.' });
    const input = await bodyJson(req, 32 * 1024);
    const text = normalizeText(input.text, 6000); const platform = normalizeText(input.platform, 40) || 'Instagram'; const sector = normalizeText(input.sector, 120); const audience = normalizeText(input.audience, 160); const goal = normalizeText(input.goal, 50) || 'engagement';
    const language = ['en', 'ru'].includes(String(input.language || 'az').toLowerCase()) ? String(input.language).toLowerCase() : 'az';
    const responseLanguage = language === 'en' ? 'English' : language === 'ru' ? 'Russian' : 'Azerbaijani';
    if (text.length < 8) return json(res, 400, { ok: false, code: 'text_too_short', message: 'Daha dolğun analiz üçün ən azı 8 simvol daxil et.' });
    const history = db.metrics.filter(m => m.userId === user.id && m.platform.toLowerCase() === platform.toLowerCase());
    const rateValues = history.map(metricRate).filter(x => x >= 0 && x < 1000);
    const accountContext = { platform, historicalPosts: history.length, medianEngagementRate: round(median(rateValues)), averageViews: history.length ? round(history.reduce((sum,m)=>sum+(m.views||0),0)/history.length,0) : null, historyNote: history.length >= 30 ? 'Tarixçə kontent kontekstinə dəstək verə bilər; model kalibrasiyası təsdiqlənməyib.' : history.length >= 10 ? 'Məhdud şəxsi tarixçə var; nəticəni ehtiyatla şərh et.' : 'Şəxsi tarixçə yetərli deyil; performans proqnozu hesablanmır.' };
    const local = contentTextReview(text, goal);
    let result = { title: 'Kontent keyfiyyəti analizi', summary: `${platform} · ${sector || 'sahə qeyd edilməyib'} · ${local.words} söz`, score: local.score, scoreKind: 'Kontent keyfiyyəti', scoreLabel: local.score >= 75 ? 'Aydın struktur' : local.score >= 55 ? 'İnkişaf potensialı' : 'Mətnə yenidən bax', confidenceLabel: 'Qayda əsaslı ilkin yoxlama; proqnoz etibarlılığı hesablanmayıb', hook: local.hook, readability: local.readability, engagement: local.engagement, recommendations: local.recommendations, engine: 'rule_based', disclaimer: 'Bu bal mətn strukturuna dair qayda əsaslı rəyidir, viral olma və ya gələcək baxış sayı proqnozu deyil. Hesab tarixçəsi: ' + accountContext.historicalPosts + ' post.' };
    if (GROQ_API_KEY) {
      const userPrompt = `Review this content as a professional social media analyst. Respond entirely in ${responseLanguage}. Never invent real engagement, virality probability, or future view counts. The score must represent text quality/structure only (0–100), not a future performance forecast. Return only JSON with keys title, summary, score, scoreLabel, hook, readability, engagement, recommendations (string array), limitations (string). Hook/readability/engagement are heuristic sub-scores 0-100 based on text. Be concrete and niche-aware. If data is insufficient, state limitations.\nINPUT: ${JSON.stringify({text,platform,goal,sector,audience,accountContext})}`;
      try {
        const ai = await askGroq([{ role: 'system', content: `You are Signal Studio, a careful social-content reviewer. Do not fabricate trends, account statistics, sources or performance guarantees. Respond in ${responseLanguage}. Output valid JSON only.` }, { role: 'user', content: userPrompt }]);
        const numeric = v => Number.isFinite(Number(v)) ? Math.max(0, Math.min(100, Math.round(Number(v)))) : null;
        result = { ...result, ...ai, score: numeric(ai.score) ?? local.score, hook: numeric(ai.hook) ?? local.hook, readability: numeric(ai.readability) ?? local.readability, engagement: numeric(ai.engagement) ?? local.engagement, recommendations: Array.isArray(ai.recommendations) ? ai.recommendations.filter(x => typeof x === 'string').slice(0, 7) : local.recommendations, engine: 'groq', scoreKind: 'AI kontent keyfiyyəti', confidenceLabel: history.length >= 30 ? `AI mətn analizi · şəxsi tarixçədə ${history.length} post var; kalibrasiya edilməyib` : 'AI mətn analizi · gələcək performans etibarlılığı yoxdur', disclaimer: `AI kontent strukturunu qiymətləndirir, real virallıq proqnozu vermir. ${accountContext.historyNote}` };
      } catch (error) { return json(res, error.status || 503, { ok: false, code: error.code || 'ai_provider_error', message: error.message || 'AI xidməti hazırda əlçatan deyil.' }); }
    }
    return json(res, 200, { ok: true, ...result, accountContext });
  }

  if (req.method === 'GET' && path === '/api/metrics') {
    const user = requireUser(req, res); if (!user) return;
    const items = db.metrics.filter(m => m.userId === user.id).sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt)));
    return json(res, 200, { ok: true, items, count: items.length });
  }
  if (req.method === 'POST' && path === '/api/metrics/import') {
    const user = requireUser(req, res); if (!user) return;
    const input = await bodyJson(req, 2 * 1024 * 1024);
    if (!Array.isArray(input.items) || input.items.length < 1 || input.items.length > 2500) return json(res, 400, { ok: false, code: 'invalid_metrics', message: 'CSV 1–2500 post aralığında olmalıdır.' });
    const existingKeys = new Set(db.metrics.filter(m=>m.userId===user.id).map(m=>`${m.publishedAt}|${m.platform}|${m.title}|${m.views}|${m.interactions ?? m.likes}`));
    let imported=0, rejected=0; const created=[];
    for (const row of input.items) {
      const date = new Date(row.publishedAt || row.date || ''); const platform=normalizeText(row.platform,40)||'Other';
      const nums = ['views','likes','comments','shares','saves','interactions'].map(k=>Number(row[k]||0));
      if (Number.isNaN(date.getTime()) || date.getFullYear()<2000 || date.getFullYear()>new Date().getFullYear()+1 || nums.some(n=>!Number.isFinite(n)||n<0||n>1e12)) { rejected++; continue; }
      const item={id:randomUUID(),userId:user.id,publishedAt:date.toISOString(),platform,title:normalizeText(row.title,300),views:nums[0],likes:nums[1],comments:nums[2],shares:nums[3],saves:nums[4],...(row.interactions!==undefined&&row.interactions!==null&&row.interactions!==''?{interactions:nums[5]}:{}),...(row.sourceEngagementRate!==undefined&&row.sourceEngagementRate!==null&&row.sourceEngagementRate!==''?{sourceEngagementRate:Number(row.sourceEngagementRate)}:{}),source:normalizeText(row.source,30)||'csv',createdAt:new Date().toISOString()};
      const key=`${item.publishedAt}|${item.platform}|${item.title}|${item.views}|${item.interactions ?? item.likes}`; if(existingKeys.has(key)){rejected++;continue;} existingKeys.add(key);created.push(item);imported++;
    }
    if (!imported) return json(res, 400, { ok: false, code: 'no_valid_metrics', message: 'Etibarlı və yeni metrik sətri tapılmadı. Tarix və rəqəm sütunlarını yoxla.', rejected });
    db.metrics.push(...created); if(db.metrics.length>150000) db.metrics=db.metrics.slice(-150000); persist();
    return json(res, 201, { ok: true, imported, rejected, count: db.metrics.filter(m=>m.userId===user.id).length });
  }

  if (req.method === 'GET' && path === '/api/reports') {
    const user = requireUser(req, res); if (!user) return;
    const period=url.searchParams.get('period')||'week';const days=period==='year'?365:period==='month'?30:7;const cutoff=Date.now()-days*86400000;const items=db.metrics.filter(m=>m.userId===user.id&&new Date(m.publishedAt).getTime()>=cutoff);const views=items.reduce((s,m)=>s+(m.views||0),0);const interactions=items.reduce((s,m)=>s+(m.interactions!==undefined&&m.interactions!==null?m.interactions:(m.likes||0)+(m.comments||0)+(m.shares||0)+(m.saves||0)),0);return json(res,200,{ok:true,period,posts:items.length,views,engagementRate:views?round(interactions/views*100):null,items});
  }

  if (req.method === 'GET' && path === '/api/trends') {
    if (rateLimited(req,'trends',20,10*60*1000)) return json(res,429,{ok:false,code:'rate_limited',message:'Trend sorğularında limitə çatdın. Bir az sonra yenidən yoxla.'});
    const geo=normalizeText(url.searchParams.get('geo')||'AZ',10).toUpperCase(); const query=normalizeText(url.searchParams.get('q')||'',100).toLocaleLowerCase('az-AZ'); const sector=normalizeText(url.searchParams.get('sector')||'all',80);
    try { let items=await fetchTrendFeed(geo); if(query) items=items.filter(item=>`${item.title} ${item.description}`.toLocaleLowerCase('az-AZ').includes(query)); items=items.slice(0,30); return json(res,200,{ok:true,live:true,sourceLabel:geo==='WORLD'?'Google Trends · ABŞ trend axını (qlobal deyil)':'Google Trends RSS',region:geo,sector:sector==='all'?'':sector,fetchedAt:new Date().toISOString(),message:items.length?`${items.length} canlı trend nəticəsi alındı. Mənbə: Google Trends RSS; bu, sosial media baxış statistikası deyil.`:`Canlı mənbə cavab verdi, amma seçilmiş axtarış üzrə uyğun nəticə tapılmadı.`,items}); }
    catch(error){console.warn('Trend feed unavailable:',error.message);return json(res,200,{ok:true,live:false,sourceLabel:'Google Trends əlçatmazdır',region:geo,fetchedAt:new Date().toISOString(),message:'Trend mənbəyinə qoşulmaq mümkün olmadı. Bir az sonra yenidən cəhd et.',items:[]});}
  }

  if (req.method === 'POST' && path === '/api/trends/recommend') {
    const user=requireUser(req,res);if(!user)return;
    if(!GROQ_API_KEY)return json(res,503,{ok:false,code:'ai_not_configured',message:'AI tövsiyəsi hazırda əlçatan deyil. Bir az sonra yenidən cəhd et.'});
    const input=await bodyJson(req,16*1024);const geo=normalizeText(input.geo||'AZ',10).toUpperCase();const sector=normalizeText(input.sector||'all',80);const audience=normalizeText(input.audience||'',160);const platform=normalizeText(input.platform||'Instagram',40);
    let trends=[];try{trends=await fetchTrendFeed(geo).then(items=>items.slice(0,20));}catch(error){return json(res,503,{ok:false,code:'trend_source_unavailable',message:'Canlı trend mənbəyinə qoşulmaq olmadı; real trend mövzusu olmadan tövsiyə yaratmıram.'});}
    if(!trends.length)return json(res,422,{ok:false,code:'no_live_trends',message:'Trend mənbəyində hazırda uyğun mövzu tapılmadı. Sonra yenidən cəhd et.'});
    const prompt=`Aşağıdakı canlı Google Trends başlıqlarından istifadə edərək ${sector==='all'?'ümumi':sector} sahəsində ${platform} üçün maksimum 5 sosial kontent bucağı hazırla. Hədəf auditoriya: ${audience||'dəqiqləşdirilməyib'}. Yalnız verilən trend başlıqlarını əsas götür; trend olmayan mövzunu trend kimi uydurma. Trend başlığının özü ilə yaradıcı ideyanı ayrı göstər. Hər nəticədə trendTitle (verilən siyahıdan eyni başlıq), contentAngle, format, hook, cta, fitRationale qaytar. Azərbaycanca yaz və valid JSON object {recommendations:[...]} qaytar. Live trend items: ${JSON.stringify(trends.map(t=>({title:t.title,traffic:t.traffic,pubDate:t.pubDate,url:t.url})))}`;
    try{const ai=await askGroq([{role:'system',content:'You are a careful social media strategist. Do not invent metrics, trending status or source URLs. All trendTitle values must exactly match the supplied items. Return valid JSON only.'},{role:'user',content:prompt}]);const suggestions=Array.isArray(ai.recommendations)?ai.recommendations.filter(x=>x&&typeof x==='object').slice(0,5):[];return json(res,200,{ok:true,engine:'groq',source:'Google Trends RSS',geo,fetchedAt:new Date().toISOString(),trendsUsed:trends.length,recommendations:suggestions});}
    catch(error){return json(res,error.status||503,{ok:false,code:error.code||'ai_provider_error',message:error.message||'AI tövsiyəsi yaradılmadı.'});}
  }

  if (req.method === 'GET' && path === '/api/business-profile') {
    const user=requirePlan(req,res,'pro');if(!user)return;const profile=db.businessProfiles.find(p=>p.userId===user.id)||null;return json(res,200,{ok:true,profile});
  }
  if (req.method === 'POST' && path === '/api/business-profile') {
    const user=requirePlan(req,res,'pro');if(!user)return;const input=await bodyJson(req,16*1024);const businessType=['company','agency','personal_brand','creator','freelancer'].includes(input.businessType)?input.businessType:(user.profileType||'creator');let profile=db.businessProfiles.find(p=>p.userId===user.id);if(!profile){profile={id:randomUUID(),userId:user.id,createdAt:new Date().toISOString()};db.businessProfiles.push(profile);}profile.businessName=normalizeText(input.businessName,120);profile.businessType=businessType;profile.sector=normalizeText(input.sector,100);profile.bio=normalizeText(input.bio,500);profile.isPublic=Boolean(input.isPublic);profile.updatedAt=new Date().toISOString();persist();return json(res,200,{ok:true,profile});
  }
  if (req.method === 'GET' && path === '/api/partners') {
    const user=requirePlan(req,res,'pro');if(!user)return;const items=db.businessProfiles.filter(p=>p.isPublic&&p.userId!==user.id&&db.users.some(u=>u.id===p.userId&&u.verified)).slice(-150).reverse().map(p=>{const u=db.users.find(u=>u.id===p.userId);return {businessName:p.businessName||u.name,businessType:p.businessType,sector:p.sector,bio:p.bio,profileType:u.profileType||'creator',createdAt:p.createdAt};});return json(res,200,{ok:true,items});
  }
  if (req.method === 'GET' && path === '/api/rewards') {
    const user=requireUser(req,res);if(!user)return;const clicks=db.referralClicks.filter(c=>c.referrerId===user.id);const events=db.referralEvents.filter(e=>e.referrerId===user.id);const recent=events.slice(-20).reverse().map(e=>({name:db.users.find(u=>u.id===e.referredUserId)?.name||'Təsdiqlənmiş dəvət',verifiedAt:e.verifiedAt,points:e.points}));return json(res,200,{ok:true,referralCode:user.referralCode||'',points:Number(user.rewardPoints)||0,clicks:clicks.length,accepted:events.length,earned:events.reduce((s,e)=>s+(e.points||0),0),recent});
  }

  if (req.method === 'POST' && path === '/api/auth/register') {
    if (rateLimited(req, 'register', 6)) return json(res, 429, { ok: false, code: 'rate_limited', message: 'Çox sayda cəhd edildi. Bir neçə dəqiqə sonra yenidən cəhd et.' });
    const input = await bodyJson(req);
    const name = normalizeText(input.name, 100);
    const username = normalizeText(input.username, 32).toLowerCase();
    const password = typeof input.password === 'string' ? input.password : '';
    const profileType = ['creator','company','agency','personal_brand','freelancer'].includes(input.profileType) ? input.profileType : 'creator';
    const referralCode = normalizeText(input.referralCode, 40).toUpperCase();
    if (name.length < 2) return json(res, 400, { ok: false, code: 'invalid_name', message: 'Ad ən azı 2 simvol olmalıdır.' });
    if (!/^[a-z0-9_.-]{3,32}$/.test(username)) return json(res, 400, { ok: false, code: 'invalid_username', message: 'İstifadəçi adı 3–32 simvol olmalı, yalnız ingilis hərfləri, rəqəm, nöqtə, _ və - istifadə etməlidir.' });
    if (password.length < 8 || password.length > 128) return json(res, 400, { ok: false, code: 'invalid_password', message: 'Şifrə 8–128 simvol aralığında olmalıdır.' });
    if (db.users.some(u => (u.username || '').toLowerCase() === username || (u.email || '').toLowerCase() === username)) return json(res, 409, { ok: false, code: 'username_exists', message: 'Bu istifadəçi adı artıq istifadə olunur. Başqa ad seç.' });
    const ipHash = clientIpHash(req);
    if (ONE_ACCOUNT_PER_IP && db.users.some(u => u.verified && u.signupIpHash && u.signupIpHash === ipHash)) return json(res, 409, { ok: false, code: 'ip_account_limit', message: 'Bu şəbəkədən yeni hesab yaratmaq hazırda mümkün olmadı. Bir az sonra yenidən cəhd et.' });
    const hashed = await passwordDigest(password);
    const referrer = referralCode ? db.users.find(u => u.referralCode === referralCode && u.verified) : null;
    const email = `${username}@username.signal-studio.invalid`;
    const user = { id: randomUUID(), name, username, email, profileType, plan: 'free', stripeCustomerId: '', stripeSubscriptionId: '', passwordSalt: hashed.salt, passwordHash: hashed.hash, verified: true, verifiedAt: new Date().toISOString(), createdAt: new Date().toISOString(), verifyTokenHash: '', verifyExpiresAt: 0, signupIpHash: ipHash, referralCode: createReferralCode(), referredBy: referrer?.id || '', rewardPoints: 0, referralRewardProcessed: false };
    while (db.users.some(u => u.referralCode === user.referralCode)) user.referralCode = createReferralCode();
    db.users.push(user);
    const rawSession = randomBytes(32).toString('base64url');
    db.sessions = db.sessions.filter(s => s.expiresAt > Date.now());
    db.sessions.push({ id: randomUUID(), userId: user.id, tokenHash: tokenHash(rawSession), createdAt: Date.now(), expiresAt: Date.now() + SESSION_TTL_MS });
    persist();
    return json(res, 201, { ok: true, code: 'account_created', message: 'Hesabın yaradıldı. Xoş gəldin!', user: safeUser(user) }, { 'Set-Cookie': cookieHeader(rawSession, SESSION_TTL_MS) });
  }

  if (req.method === 'POST' && path === '/api/auth/resend-verification') {
    if (rateLimited(req, 'resend', 5)) return json(res, 429, { ok: false, code: 'rate_limited', message: 'Çox sayda cəhd edildi. Bir az sonra yenidən yoxla.' });
    const input = await bodyJson(req);
    const email = normalizeText(input.email, 254).toLowerCase();
    if (!validateEmail(email)) return json(res, 400, { ok: false, code: 'invalid_email', message: 'Düzgün e-poçt ünvanı daxil et.' });
    const user = db.users.find(u => u.email === email && !u.verified);
    if (!user) return json(res, 200, { ok: true, code: 'if_applicable', message: 'Əgər təsdiq gözləyən hesab mövcuddursa, məktub göndəriləcək.' });
    const result = await issueVerification(user);
    if (!result.ok) return json(res, 503, { ok: false, code: result.code, message: result.message, canResend: true });
    return json(res, 200, { ok: true, code: result.dev ? 'dev_verification_link_logged' : 'verification_sent', message: result.dev ? 'E-poçt göndərişi bu lokal mühitdə aktiv deyil. Yeni təsdiq keçidi server jurnalında göstərilib.' : 'Təsdiq məktubu yenidən göndərildi.' });
  }

  if (req.method === 'GET' && path === '/api/auth/verify') {
    const result = await completeEmailVerification(url.searchParams.get('token') || '');
    if (!result.ok) return json(res, result.status, { ok: false, code: result.code, message: result.message });
    return json(res, 200, { ok: true, code: 'email_verified', message: 'E-poçt təsdiqləndi. İş məkanına xoş gəldin!', user: result.user }, { 'Set-Cookie': result.cookie });
  }

  if (req.method === 'POST' && path === '/api/auth/login') {
    if (rateLimited(req, 'login', 10)) return json(res, 429, { ok: false, code: 'rate_limited', message: 'Çox sayda giriş cəhdi edildi. Bir az sonra yenidən yoxla.' });
    const input = await bodyJson(req);
    const identifier = normalizeText(input.username || input.identifier || input.email, 254).toLowerCase();
    const password = typeof input.password === 'string' ? input.password : '';
    const user = db.users.find(u => (u.username || '').toLowerCase() === identifier || (!u.username && (u.email || '').toLowerCase() === identifier));
    if (!user || !password || !await passwordMatches(password, user)) return json(res, 401, { ok: false, code: 'invalid_credentials', message: 'İstifadəçi adı və ya şifrə yanlışdır.' });
    if (!user.verified) return json(res, 403, { ok: false, code: 'account_not_active', message: 'Bu köhnə hesab hələ aktivləşdirilməyib. Mövcud hesab üçün əvvəlki təsdiq prosesi tələb olunur.', email: user.email, canResend: true });
    if (SUPABASE_AUTH_CONFIGURED) {
      try {
        // Sync verified state on login too, including older identities created before
        // a verification retry. Local auth remains available if Supabase is unavailable.
        await ensureSupabaseAuthUser(user, password);
      } catch (error) {
        console.error('Supabase user sync failed at login; continuing with local verified account:', error.message);
      }
    }
    const rawSession = randomBytes(32).toString('base64url');
    db.sessions = db.sessions.filter(s => s.expiresAt > Date.now());
    db.sessions.push({ id: randomUUID(), userId: user.id, tokenHash: tokenHash(rawSession), createdAt: Date.now(), expiresAt: Date.now() + SESSION_TTL_MS });
    persist();
    return json(res, 200, { ok: true, user: safeUser(user) }, { 'Set-Cookie': cookieHeader(rawSession, SESSION_TTL_MS) });
  }

  if (req.method === 'POST' && path === '/api/auth/logout') {
    const cookie = readCookies(req)[SESSION_COOKIE];
    if (cookie) { const hash = tokenHash(cookie); db.sessions = db.sessions.filter(s => s.tokenHash !== hash); persist(); }
    return json(res, 200, { ok: true, message: 'Hesabdan çıxış edildi.' }, { 'Set-Cookie': sessionCookieClear() });
  }

  if (req.method === 'GET' && path === '/api/me') {
    const user = getSessionUser(req);
    if (!user) return json(res, 401, { ok: false, code: 'auth_required', message: 'Hesaba daxil olmayıb.' });
    return json(res, 200, { ok: true, user: safeUser(user) });
  }

  if (path === '/api/content' && req.method === 'GET') {
    const user = requireUser(req, res); if (!user) return;
    return json(res, 200, { ok: true, items: db.content.filter(c => c.userId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
  }
  if (path === '/api/content' && req.method === 'POST') {
    const user = requireUser(req, res); if (!user) return;
    const input = await bodyJson(req);
    const title = normalizeText(input.title, 300);
    if (title.length < 2) return json(res, 400, { ok: false, code: 'invalid_title', message: 'İdeya adı ən azı 2 simvol olmalıdır.' });
    const item = { id: randomUUID(), userId: user.id, title, body: normalizeText(input.body, 2000), platform: normalizeText(input.platform, 40) || 'Instagram', format: normalizeText(input.format, 60) || 'Post', status: 'idea', createdAt: new Date().toISOString() };
    db.content.push(item); persist();
    return json(res, 201, { ok: true, item });
  }
  if (path.startsWith('/api/content/') && req.method === 'DELETE') {
    const user = requireUser(req, res); if (!user) return;
    const id = decodeURIComponent(path.slice('/api/content/'.length));
    const before = db.content.length;
    db.content = db.content.filter(c => !(c.id === id && c.userId === user.id));
    if (db.content.length === before) return json(res, 404, { ok: false, code: 'not_found', message: 'İdeya tapılmadı.' });
    persist(); return json(res, 200, { ok: true });
  }
  return json(res, 404, { ok: false, code: 'not_found', message: 'API endpoint tapılmadı.' });
}

const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json; charset=utf-8' };
function staticFile(req, res, url) {
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return json(res, 400, { ok: false, code: 'invalid_path', message: 'URL yolu düzgün deyil.' });
  }
  // URL paths use forward slashes on every OS. Validate using path.relative
  // so the app works on Windows as well as Linux/macOS.
  const publicPageRoutes = new Set(['/', '/predictor', '/features', '/how-it-works']);
  // These are real shareable page URLs backed by the same SPA document. The
  // client uses the current path to render the requested public page.
  const cleanPath = publicPageRoutes.has(pathname) ? 'index.html' : (pathname.replace(/^[/\\]+/, '') || 'index.html');
  const target = resolve(PUBLIC_DIR, cleanPath);
  const rel = relative(PUBLIC_DIR, target);
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    return json(res, 403, { ok: false, code: 'forbidden_path', message: 'Bu fayla giriş icazəli deyil.' });
  }
  try {
    const data = readFileSync(target);
    const type = mimeTypes[extname(target)] || 'application/octet-stream';
    const extension = extname(target);
    const cachePolicy = ['.html', '.js', '.css'].includes(extension) ? 'no-cache, must-revalidate' : 'public, max-age=3600';
    res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'DENY', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()', 'Cache-Control': cachePolicy });
    res.end(data);
  } catch (error) {
    if (error.code === 'ENOENT') return json(res, 404, { ok: false, message: 'Fayl tapılmadı.' });
    console.error('Static file error:', error.message);
    return json(res, 500, { ok: false, message: 'Fayl oxunarkən xəta baş verdi.' });
  }
}

export const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host || `localhost:${PORT}`;
    const url = new URL(req.url || '/', `http://${host}`);
    // Email links historically point to /?verify=TOKEN. Verify them server-side
    // before serving the SPA so a stale/cached app.js cannot leave accounts pending.
    // Also support /verify?token=TOKEN for links generated by newer builds.
    const browserVerifyToken = url.pathname === '/verify'
      ? (url.searchParams.get('token') || '')
      : (url.pathname === '/' ? (url.searchParams.get('verify') || '') : '');
    if (req.method === 'GET' && (url.pathname === '/verify' || (url.pathname === '/' && url.searchParams.has('verify')))) {
      const result = await completeEmailVerification(browserVerifyToken);
      if (!result.ok) {
        const html = `<!doctype html><html lang="az"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email təsdiqi — Signal Studio</title><body style="margin:0;background:#f4f6f0;color:#172016;font:17px/1.6 system-ui,sans-serif;min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box"><main style="max-width:580px;width:100%;background:white;border:1px solid #dfe5d8;border-radius:22px;padding:32px;box-sizing:border-box"><div style="font-weight:800;color:#385c24;letter-spacing:.08em">SIGNAL / STUDIO</div><h1 style="font-size:clamp(28px,5vw,40px);line-height:1.15">Təsdiq tamamlana bilmədi</h1><p>${escapeHtml(result.message)}</p><p><a href="/" style="display:inline-block;background:#caff70;color:#172016;text-decoration:none;font-weight:800;padding:13px 18px;border-radius:12px">Ana səhifəyə qayıt</a></p><p style="font-size:14px;color:#5c6658">Hesabın artıq təsdiqlənibsə, giriş etməyə cəhd et. Əks halda giriş pəncərəsindən yeni təsdiq məktubu istə.</p></main></body></html>`;
        res.writeHead(result.status, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
        return res.end(html);
      }
      res.writeHead(303, { 'Location': '/?verified=1', 'Set-Cookie': result.cookie, 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' });
      return res.end();
    }
    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url);
    } else if (req.method === 'GET' || req.method === 'HEAD') {
      if (req.method === 'HEAD') { res.writeHead(200); return res.end(); }
      staticFile(req, res, url);
    } else {
      json(res, 405, { ok: false, code: 'method_not_allowed', message: 'Bu HTTP metodu dəstəklənmir.' }, { Allow: 'GET, HEAD, POST, DELETE' });
    }
  } catch (error) {
    console.error('Request failed:', error.stack || error.message);
    if (!res.headersSent) json(res, error.status || 500, { ok: false, code: error.code || 'internal_error', message: error.status ? error.message : 'Serverdə gözlənilməz xəta baş verdi. Logları yoxlayın.' });
    else res.destroy();
  }
});

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  server.listen(PORT, () => {
    console.log(`Signal Studio listening at http://localhost:${PORT}; verification URL base: ${BASE_URL}`);
    console.log(`Email delivery: ${GMAIL_USER && GMAIL_APP_PASSWORD ? 'Gmail SMTP configured' : RESEND_API_KEY && EMAIL_FROM ? 'Resend configured' : 'NOT configured (registration will explain the issue)'}`);
  console.log(`Environment: ${ENV_FILE_LOADED ? '.env loaded' : 'OS environment only'}; Supabase URL: ${SUPABASE_URL ? (() => { try { return new URL(SUPABASE_URL).host; } catch { return 'invalid URL'; } })() : 'MISSING'}; server key: ${SUPABASE_KEY_TYPE}`);
    console.log(`Supabase Auth: ${SUPABASE_AUTH_CONFIGURED ? `configured via ${SUPABASE_KEY_SOURCE} (${SUPABASE_KEY_TYPE})` : `NOT configured (${SUPABASE_KEY_TYPE})`}`);
    console.log(`Build: ${APP_BUILD}`);
    console.log(`Data file: ${DATA_FILE}`);
  });
}
