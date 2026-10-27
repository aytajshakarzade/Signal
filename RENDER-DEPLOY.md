# Signal Studio - Render deploy

1. Create a private GitHub repository and upload project files. Do NOT upload `.env` or secrets. `.gitignore` excludes `.env`; verify this before pushing.
2. On Render choose New > Blueprint and connect the repository.
3. Add the values from your local `.env` into Render Environment variables manually. Do not paste secrets into GitHub.
4. After Render gives you the service URL, set `BASE_URL` to that exact `https://...onrender.com` URL.
5. Update Supabase Auth allowed redirect/site URLs to the deployed URL.
6. Set Stripe webhook URL to `https://YOUR-SERVICE.onrender.com/api/stripe/webhook` and use the production/test-mode webhook secret matching your Stripe mode.
7. Deploy and test `/api/health`, signup, email verification, and checkout.

The included `.env` is for local reference only; it contains credentials from the supplied archive and a placeholder BASE_URL. Never commit it to GitHub. Render does not automatically load a repository `.env` file.
