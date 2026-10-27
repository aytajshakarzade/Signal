@echo off
setlocal
cd /d "%~dp0"
echo.
echo ============================================================
echo   SIGNAL STUDIO v17 - editorial UI + email fix
echo ============================================================
echo.
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js tapilmadi. Node.js 20 ve ya daha yeni versiyani qurasdir: https://nodejs.org/
  pause
  exit /b 1
)
node -e "const m=Number(process.versions.node.split('.')[0]); if(m<20) process.exit(1)" >nul 2>&1
if errorlevel 1 (
  echo Node.js 20 ve ya daha yeni versiya teleb olunur.
  node --version
  pause
  exit /b 1
)
if not exist ".env" (
  if exist ".env.example" (
    copy ".env.example" ".env" >nul
    echo .env konfiqurasiya fayli yaradildi. Acarlari .env faylinda daxil et.
  ) else (
    echo .env.example fayli tapilmadi.
    pause
    exit /b 1
  )
)
set "OLD_PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":3000 .*LISTENING"') do if not defined OLD_PID set "OLD_PID=%%P"
if defined OLD_PID (
  echo XETA: 3000 portu artiq istifadededir (PID %OLD_PID%).
  echo Bu, kohne Signal Studio serverinin hele aciq qalmasi ola biler.
  echo Kohne CMD penceresine kecib Ctrl+C basin, sonra bu fayli yeniden acin.
  echo Bashqa proqramin prosesini avtomatik baglamadim.
  pause
  exit /b 2
)
if not exist "node_modules\ffmpeg-static\package.json" (
  echo FFmpeg paketi qurasdirilir...
  call npm install
  if errorlevel 1 (
    echo Paketler qurasdirilmadi. Interneti yoxla ve npm install emrini yeniden ise sal.
    pause
    exit /b 1
  )
)
if not exist "node_modules\nodemailer\package.json" (
  echo Email gonderisi ucun Nodemailer paketi qurasdirilir...
  call npm install
  if errorlevel 1 (
    echo Email paketi qurasdirilmadi. Interneti yoxla ve npm install emrini yeniden ise sal.
    pause
    exit /b 1
  )
)
echo Server bu qovluqdaki .env faylini oxuyacaq.
echo Video ucun FFmpeg ve e-poct gonderisi ucun Nodemailer paketleri yoxlanildi.
echo Server penceresini baglamayin.
echo.
start "" /b cmd /c "timeout /t 2 /nobreak >nul ^& start http://localhost:3000"
npm start
pause
