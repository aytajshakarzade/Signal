@echo off
setlocal
cd /d "%~dp0"
echo Bu emeliyyat yalniz bu qovluqdaki lokal app-data.json faylini sifirlayacaq.
echo Supabase panelindeki uzaq Auth istifadecilerini SILMIR.
echo Lokal hesablari, sessiyalari, ideyalari, hesabatlari ve devec / mukafat melumatlarini silir.
echo.
choice /C YN /M "Davam edilsin?"
if errorlevel 2 exit /b 0
if not exist "data" mkdir data
(
  echo {
  echo   "users": [],
  echo   "sessions": [],
  echo   "content": [],
  echo   "metrics": [],
  echo   "businessProfiles": [],
  echo   "referralClicks": [],
  echo   "referralEvents": []
  echo }
) > "data\app-data.json"
echo Lokal app datasi sifirlandi. Serveri yeniden başladin.
pause
