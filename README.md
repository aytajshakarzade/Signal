# Signal Studio — v17 (editorial UI, reliable mail errors and routed pages)

Signal Studio is an Azerbaijani-first social content workspace with a restrained editorial visual system, warm paper palette, clearer typography, light/dark themes, a Node.js backend and integrations for **publicly available** social data. The visual direction is original and inspired by energetic editorial/event sites; it does not copy HackWestern's exact page, code, assets or wording.

## What's included in v17

- **UI:** light/dark mode, responsive editorial typography, warm paper surfaces, simplified reporting cards and separate public routes. Public routes `/`, `/predictor`, `/features` and `/how-it-works` load as separate pages.
- **Authentication:** email/password registration, one-time verification links, HttpOnly sessions and basic rate limits.
- **Supabase Auth:** when the project URL and a server-only `sb_secret_...` or legacy `service_role` key are configured, registration creates a real Supabase Auth user. Other application records remain in local JSON; see Storage limitation below.
- **Email confirmation:** Gmail SMTP is tried first when configured; Resend is the fallback. `npm start` now checks missing runtime packages. If a configured provider rejects a message, the signup shows the delivery error instead of claiming the email was sent. Resend test senders may restrict recipients.
- **Content analysis:** rule-based text quality review, plus AI-based critique when `GROQ_API_KEY` is configured. No guarantee or fabricated viral score.
- **Video Lab:** MP4/MOV upload (up to 500 MB), bundled FFmpeg frame extraction and duration probing, optional speech transcription and multimodal AI review. Requires npm dependencies and Groq API access for AI features; a separate FFprobe installation is not required.
- **Apify public-data connectors:** Instagram Reels, Facebook public Pages, TikTok public profile videos, YouTube Shorts and LinkedIn public post search. Results are normalized, imported into reports and can be exported as JSON/CSV.
- **Trend Explorer:** Google Trends RSS where the feed is reachable; weekly/monthly/yearly reports for imported metrics.
- **Team / partner directory, content library, referral links and reward points.**
- **Subscriptions:** Free (10 AI chat messages/day), Go (100/day, Video Lab and public-source imports) and Pro (400/day, plus team directory) are enforced server-side. Stripe Checkout, subscription confirmation, billing portal and signed webhook handling are implemented; live payments require your own configured Stripe account, recurring price IDs and webhook secret. Groq, Apify and email providers may also incur usage costs.

## Run on Windows

1. Install Node.js 20 or newer.
2. Stop any older Signal Studio process by pressing `Ctrl+C` in its CMD window before you start the new version.
3. Extract this ZIP to your project folder. This update preserves the uploaded `.env` byte-for-byte and does not edit it. Keep the file private and do not commit or share it. When installing on a new machine, create `.env` from `.env.example` and enter your own current credentials. Use `GROQ_API_KEY` for AI analysis; for Supabase Auth, use a server-only secret key, never a publishable key.
4. Double-click `START-SIGNAL-STUDIO.bat` (it installs the Node dependencies if needed), or open a terminal in the folder containing `package.json`, run `npm install`, then `npm start`.
5. Open `http://localhost:3000/api/health`. The `build` should show `v18-video-gates-trilingual-ui`. `/api/health` also reports the selected email provider and whether Nodemailer is installed, without revealing credentials.
6. Open `http://localhost:3000`.


## Configure Apify once

1. Open `SETUP-APIFY.bat`, or go to Apify Console → Settings → API & Integrations → API tokens.
2. Copy the actual Apify API token (not the masked `******` view).
3. Open the root `.env` file beside `package.json`, find `APIFY_API_TOKEN=`, and paste the token after `=` with no quotes, for example `APIFY_API_TOKEN=apify_api_xxx`.
4. Save `.env` and restart the server. The token is only read by the backend; it is not sent to browser JavaScript.
5. Sign in, open **Platforma bağlantıları**, select the platform, enter a public target or search phrase, tick the consent box and press **Məlumatları gətir**. Successful metrics are saved to the local report store and can be downloaded as CSV/JSON.

See `APIFY-QURULUMU.txt` for details and safe-usage notes. Scraping uses the Apify credits available on your account and actor-specific pricing. Start with a small result limit (3–10) to control usage. Transcript extraction can cost extra on supported actors.

## What public-data connectors can and can't do

- **Instagram:** accepts a public username/profile URL or Reel URL. The `apify/instagram-reel-scraper` actor can return fields such as caption, time, views, likes, comments, hashtags and duration when available. Transcript/share-count/download options may involve extra charges.
- **Facebook:** supports public Page/post data returned by the selected actor, not private personal profiles or private groups.
- **TikTok:** public videos and engagement fields, subject to actor accessibility and current platform restrictions.
- **YouTube:** public Shorts data for channels/handles supported by the selected actor.
- **LinkedIn:** public post search by a topic/query; it is not private analytics for a personal or company account.

The platform cards also open the official Instagram, Facebook, TikTok, YouTube and LinkedIn destinations. This is **not** the same as an official OAuth connection. Reading private account Insights or publishing/acting on behalf of a user requires the relevant platform's developer app, OAuth permissions, reviews and credentials. Apify public scraping does not reveal private statistics, and results vary by actor, public visibility, limits and current platform rules.

## Configure real email (Gmail SMTP + Resend)

1. Create a Resend account and API key.
2. In `.env`, configure `GMAIL_USER` plus a 16-character Google App Password for Gmail SMTP. The current server tries Gmail first. For the Resend fallback, configure `RESEND_API_KEY` and a suitable `EMAIL_FROM`.
3. For arbitrary recipients, verify a domain in Resend and use an address at that domain. `onboarding@resend.dev` is a test sender and may be limited to verified test recipients.
4. Restart the server. `npm start` checks for the required packages automatically. See `EMAIL-QURULUMU.txt`.

## Connect Supabase Auth

1. In Supabase, copy the project URL and a **server-only secret** (`sb_secret_...`) from Project Settings → API Keys. Never place it in browser JS, screenshots or public repositories.
2. Copy your private `.env` into this folder and preserve the correct Supabase server-only secret (`sb_secret_...`) or legacy `service_role` value. Never put a `sb_publishable_...` / `anon` key in a server-secret variable, and never share the `.env` file.
3. The safe status fields appear at `/api/health`; the actual secret value is never returned.
4. Optional: run `supabase/schema.sql` in Supabase SQL Editor to mirror profile fields in `public.signal_users`.
5. If an older version already created an unverified local-only user, submit registration again after Supabase is configured to provision it through Supabase Auth and resend confirmation.

## Video analysis requirements

- `GROQ_API_KEY` set in `.env`; text uses `GROQ_MODEL`, visual analysis uses `GROQ_VISION_MODEL`, and transcription uses `GROQ_TRANSCRIPTION_MODEL`.
- Install project dependencies with `npm install`; `ffmpeg-static` supplies the FFmpeg binary and duration probing does not require a separate FFprobe executable. Restart Signal Studio after installing dependencies.
- MP4/MOV under the 500 MB upload limit. Video processing depends on API availability, media size and provider limits.

## Storage limitation

Supabase Auth handles account identity/verification when configured, but content ideas, scrape/report results, local sessions, reward points and partner profiles currently use `data/app-data.json`. This is a local MVP, not yet production-grade cloud persistence for multiple servers. Before a public production launch, migrate these entities to Postgres, implement consent/privacy/deletion flows, durable job processing, backups, HTTPS and coordinated rate limiting.

## Tests

```bash
npm test
node --check src/server.mjs
node --check public/assets/app.js
node --check public/assets/interactions.js
```

Automated tests use mocked providers and do not verify your real Apify/Supabase/Resend/Groq accounts. Always validate your own credentials locally.


## v13 release notes
- AI requests run through Groq endpoints; no OpenAI API key or OpenAI API endpoint is used. The default text model is hosted by Groq even though its model ID starts with `openai/`.
- General/public release archives must not contain `.env` or private user data. This local update archive preserves the uploaded `.env` unchanged as requested, but does not include prior local signup/session records.
- Interface language can be switched between Azerbaijani, English, and Russian from the public header or workspace top bar; preference is stored locally.
- On small screens, the primary navigation opens from the menu button.
- In local development, a local verification link is printed only when no email provider is configured. If Gmail/Resend is configured but rejects a message, registration now returns the provider error rather than false success.
- A production sender requires a sender domain verified in Resend; `onboarding@resend.dev` is only suitable for restricted testing.


## Clean reinstall and troubleshooting (v17)

- This ZIP begins with an empty local JSON database; previous local test signups and sample user records are not included. It does not erase remote users in your Supabase project.
- Stop any previous Signal Studio server before starting this version. `START-SIGNAL-STUDIO.bat` detects if port 3000 is already occupied and asks you to stop the old process instead of silently continuing against an old server.
- After startup, open `http://localhost:3000/api/health`. Confirm `build` is `v18-video-gates-trilingual-ui`, `envFileLoaded` is `true`, `supabaseUrlConfigured` is `true`, and `supabaseKeyStatus` is `secret_api_key`. Then open `http://localhost:3000/api/diagnostics/supabase` for a read-only live Auth endpoint check. If `build` has a different value, the browser is reaching another/older server.
- UI assets use new versioned URLs and no-cache headers. A hard refresh (`Ctrl+F5`) is only needed once if the browser still displays the previous design. The language engine keeps an original text baseline, so switching languages cannot repeatedly translate already-translated words.
- `RESET-LOCAL-DATA.bat` is an optional destructive reset for local users, sessions, content, reports, referrals and partner records. It does not delete anything from Supabase.
- Supabase connectivity is not the same as a non-empty `.env`: verify the exact project host and inspect the new safe fields in `/api/health`. HTTP 404 now describes a server-returned Auth API 404, not an empty URL.


## Workspace UI and product positioning

- Desktop workspace sidebar stays fixed to the left edge; its navigation scrolls independently while the account card remains pinned. On mobile, the sidebar becomes a slide-out drawer.
- Added a simplified workspace dashboard and feature-led product section; the competitor comparison has been removed.
- The product section explains Signal Studio’s workflow without naming competitors.
- Signal Studio outputs are described as pre-publish video quality review, not as an uncalibrated future-views or virality prediction.


## Frontend preview və qeydiyyat 404 xətası

Qeydiyyat pəncərəsində `Server JSON olmayan cavab qaytardı (404)` görünürsə, səhifə böyük ehtimalla yalnız frontend preview-dan açılıb; həmin preview Node API marşrutlarını işə salmır. Layihənin qovluğundakı `START-SIGNAL-STUDIO.bat` faylını başladıb tətbiqi `http://localhost:3000` ünvanından aç. Sonra `http://localhost:3000/api/health` ünvanında `build: v18-video-gates-trilingual-ui` cavabını yoxla. Frontend və `/api/auth/register` backend-i eyni serverdən işləməlidir. Bu yoxlama `.env` və API açarlarını dəyişməyi tələb etmir.

Hostinqdə istifadə edirsənsə, sadəcə `public` qovluğunu statik yerləşdirmək kifayət deyil; `src/server.mjs` işləyən Node serveri API sorğularını da qəbul etməlidir.


## Email confirmation troubleshooting

- Copy `.env.example` to `.env` and configure your own credentials. Never share `.env`.
- The email contains a **confirmation link**, not a numeric code. Open the newest link in the same machine/browser where Signal Studio is running at `http://localhost:3000`.
- A local verification URL is printed only if no mail provider is configured and local development fallback is enabled. If a configured provider rejects the message, inspect the Gmail SMTP / Resend error in the server console and correct the provider setup.
- Local email verification creates the Signal Studio session. If the optional Supabase Admin API is temporarily unavailable, local sign-in is allowed and remote confirmation sync is retried at sign-in. Check `/api/health` for safe configuration status; never paste API keys into chat.

## AI Assistant and paid plans

The workspace includes a server-side AI assistant at `POST /api/ai/chat`. It uses the existing `GROQ_API_KEY` setting, requires a verified signed-in user, and enforces a daily message quota by plan (Free 10, Go 100, Pro 400). Chat provider credentials are never sent to the browser.

Stripe subscriptions use these server-only variables in `.env`: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_GO`, `STRIPE_PRICE_PRO`, and `STRIPE_WEBHOOK_SECRET`. Create active recurring USD prices of **$9/month for Go** and **$19/month for Pro**, then set the corresponding Price IDs. Checkout validates each configured Price against the displayed amount before starting a session. Configure a Stripe webhook pointing to `/api/stripe/webhook` and subscribe at least to `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`; use the signing secret for `STRIPE_WEBHOOK_SECRET`. Keep all Stripe secrets server-side. Use Stripe test keys and test prices before going live.

The user-facing plan switch is not marked active unless a Stripe Checkout session and the resulting subscription have been confirmed by Stripe. Without valid Stripe credentials and Price IDs, the plan UI remains available but checkout returns a clear message and does not change the account tier.


## v13 premium workspace updates

- Separate Predictor Lab and Video Lab workspaces with independent navigation states.
- Fixed desktop sidebar with an independently scrollable navigation list, pinned account area, responsive mobile drawer, and sticky workspace header.
- Softer light theme and stronger text contrast for both themes.
- Platform connector copy simplified; no fixed sample engagement KPIs are rendered before analysis. The landing analyzer uses the server analysis route and labels its score as content-structure quality, not a forecast of real-world reach.
- Added the authenticated Signal AI chat workspace and Free/Go/Pro membership screen. The AI chat quota is enforced server-side (10/100/400 messages per day).
- Added Stripe Checkout, subscription confirmation, customer portal and signature-verified webhooks. Real payments still require valid Stripe credentials, monthly price IDs, a configured webhook, and deployment under a publicly reachable HTTPS URL.
- Verification tests confirm the email link can be checked server-side and creates a verified session in the same running service. Real email delivery still depends on the account/provider setup.


## v13 visual and routing updates

- The public navbar now opens distinct paths: `/predictor`, `/features`, and `/how-it-works`. The server maps those paths to the app document and the frontend shows the matching page content.
- The home page uses a paper-and-collage style with soft lavender, peach and lime accents, hand-made-looking stickers, and separate dark-mode colors. This is an original implementation inspired by Hack Western's energetic editorial art direction; it does not reuse that site's source code or original assets.
- `Gmail SMTP` failure no longer prevents a configured Resend backup from being attempted. A local verification link is only the development fallback, not proof that an email reached an inbox.
- The project ZIP contains `.env.example`, an empty local data file, and no live `.env` credentials or `node_modules`.


## v18 feature access and visual fixes

- Video Lab is visibly locked on Free and opens for Go/Pro. Its server endpoint still independently requires Go or Pro.
- Team & Business shows a Pro upgrade panel on Free/Go and loads the actual profile/network panel for Pro. Its server endpoints still independently require Pro.
- Video analysis now renders in the Video Lab results panel and can be saved directly to the content library. Text, video, and assistant AI requests include the selected Azerbaijani/English/Russian locale.
- Dark-mode table rows use dark surfaces with light text; light mode uses high-contrast ink. The navigation and language selector have responsive styles for narrow screens.
- After launching, confirm `build: v18-video-gates-trilingual-ui` at `/api/health` to avoid a cached/older server.

### CSV hesabat idxalı — v18

Hesabatlar həm iki formatlı CSV faylını qəbul edir:

- `date, platform, post, views, interactions, er` — ümumi qarşılıqlı əlaqə sayı olan fayllar üçün. Məsələn, `Date, Platform, Post, Views, Interactions, ER`.
- `date, platform, title, views, likes, comments, shares, saves` — qarşılıqlı əlaqə növləri ayrı sütunlarda olan fayllar üçün.

İdxalda rəqəmlərdəki minlik vergüllər və `ER` sütunundakı `%` işarəsi təmizlənir. Ümumi `interactions` rəqəmi veriləndə hesabat həmin cəmi istifadə edir, onu likes/comments/shares ilə ikinci dəfə toplamır. ER hesabatda baxış və qarşılıqlı əlaqə rəqəmlərindən yenidən hesablanır.
