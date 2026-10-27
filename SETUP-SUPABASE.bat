@echo off
cd /d "%~dp0"
if not exist ".env" (
  if exist ".env.example" copy ".env.example" ".env" >nul
)
echo.
echo SIGNAL STUDIO - SUPABASE AUTH QURULUMU
echo 1. Supabase Dashboard-da Project Settings - API Keys bolmesine kec.
echo 2. Project URL ve server-only secret key (sb_secret_...) gotur.
echo 3. v6 public sb_publishable acari avtomatik kecir ve sb_secret acari secir.
echo 4. .env faylindaki MOVCUD acarleri silme; server acarinin SUPABASE_SECRET_KEY ve ya SUPABASE_SERVICE_ROLE_KEY setirinde oldugunu yoxla.
echo 5. RESEND_API_KEY ve EMAIL_FROM deyerlerinin de duzgun oldugunu yoxla.
echo 6. Serveri dayandir ve yeniden npm start ile baslat.
echo.
start "" "https://supabase.com/dashboard"
start "" notepad.exe "%CD%\.env"
pause
