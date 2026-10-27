# Signal Studio — Render deployment

## Deploy
1. Upload this project to a private GitHub repository (do not add `.env`).
2. In Render, choose **New → Blueprint** and connect that repository.
3. Render will detect `render.yaml`. Create the service and persistent disk.
4. In the Render service's Environment settings, set `BASE_URL` to the deployed HTTPS URL, e.g. `https://your-service.onrender.com`.
5. Add only the credentials you actually use from your local `.env` as Render environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY` (or the supported service-role variable)
   - `GMAIL_USER` and `GMAIL_APP_PASSWORD`, and/or `RESEND_API_KEY` and `EMAIL_FROM`
   - `GROQ_API_KEY` for AI analysis
   - `APIFY_API_TOKEN` for public-data imports
   - `STRIPE_SECRET_KEY`, `STRIPE_PRICE_GO`, `STRIPE_PRICE_PRO`, `STRIPE_WEBHOOK_SECRET` for Stripe
6. Deploy, then visit `https://your-service.onrender.com/api/health`.
7. In Stripe, create/update the webhook endpoint to `https://your-service.onrender.com/api/stripe/webhook` and subscribe to the event types required by the app.
8. Update Supabase Auth's allowed redirect/site URLs to the deployed HTTPS domain if Supabase Auth is enabled.

## Important
- `.env` is intentionally excluded from this deployment archive. Do not commit secrets to GitHub.
- `BASE_URL` must be the real HTTPS deployment URL, not localhost.
- Verify that the server binds to the platform-provided port and that `/api/health` returns healthy after deployment.
- The persistent disk is mounted at the app's `data` directory to preserve local JSON data. A persistent disk can affect plan/region choices and may add cost.
- Test signup/email verification, login, video upload, and Stripe test checkout after deploy. Use Stripe test credentials until ready for live payments.
