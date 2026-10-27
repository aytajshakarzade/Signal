@echo off
cd /d "%~dp0"
if not exist ".env" (
  if exist ".env.example" copy ".env.example" ".env" >nul
)
echo.
echo SIGNAL STUDIO - REAL EMAIL QURULUMU
 echo 1. Resend hesabina daxil ol ve API key yarat.
echo 2. Acilan .env faylinda RESEND_API_KEY, EMAIL_FROM ve DEV_EMAIL_MODE setirlerini yoxla. Movcud acarleri silme.
echo 3. onboarding@resend.dev test gondereni yalniz Resend hesabinda tesdiqlenmis aliciya isleyebilir.
echo 4. Hamiyaya email gondermek ucun oz domenini Resend-de tesdiq etmelisen.
echo.
start "" "https://resend.com/api-keys"
start "" notepad.exe "%CD%\.env"
pause
