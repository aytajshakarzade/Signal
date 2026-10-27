@echo off
setlocal
cd /d "%~dp0"
start "" "https://console.apify.com/settings/integrations"
echo.
echo Apify Console opened in your browser.
echo 1. Copy your REAL API token from API tokens.
echo 2. Paste it into APIFY_API_TOKEN= in the .env file.
echo 3. Save the file and restart Signal Studio.
echo.
notepad .env
pause
