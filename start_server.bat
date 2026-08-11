@echo off
:: This ensures the script runs from its own folder
cd /d "%~dp0"

title Marca Rise Server Manager
echo ====================================================
echo 2026:    MARCA RISE SERVER STARTUP SYSTEM
echo ====================================================

:: Check if cloudflared.exe exists
if not exist ".\cloudflared.exe" (
    echo [ERROR] cloudflared.exe not found! Please check the copy step.
)

:: Check if python venv exists
if not exist "backend\venv\" (
    echo [ERROR] Python virtual environment is missing!
    echo Please run backend environment setup first.
)

:: Kill any existing processes on ports 4000 and 8000
echo Cleaning up old processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1

:: Start the Python FastAPI Backend Server (Port 8000)
echo Starting Python Backend on port 8000...
start /b "Marca Rise Backend" cmd /c "cd backend && .\venv\Scripts\python.exe -m uvicorn server:app --host 127.0.0.1 --port 8000 > ..\backend.log 2>&1"

:: Wait a bit for backend to initialize
timeout /t 5 >nul

:: Start the Monitoring/Frontend Server (Port 4000)
echo Starting Monitor Server on port 4000...
start /b "Marca Rise Monitor" cmd /c "node monitor.js > monitor.log 2>&1"

echo ----------------------------------------------------
echo SERVERS ARE RUNNING!
echo Local Website:  http://localhost:4000
echo Local Dashboard: http://localhost:4000/monitor
echo Domain:         https://marcarise.in
echo ----------------------------------------------------
echo Starting Cloudflare Tunnel...

:: Start Cloudflare Tunnel using the config file
.\cloudflared.exe tunnel --config .\config.yml run marcarise-tunnel

pause
