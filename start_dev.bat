@echo off
:: This ensures the script runs from its own folder
cd /d "%~dp0"

title Marca Rise Dev Manager
echo ====================================================
echo 2026:    MARCA RISE DEVELOPMENT STARTUP SYSTEM
echo ====================================================

:: Kill any existing processes on ports 3000 and 8000
echo Cleaning up old processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1

:: Start the Python FastAPI Backend Server (Port 8000)
echo Starting Python Backend on port 8000...
start /b "Marca Rise Backend" cmd /c "cd backend && .\venv\Scripts\python.exe -m uvicorn server:app --host 127.0.0.1 --port 8000 > ..\backend.log 2>&1"

:: Wait a bit for backend to initialize
timeout /t 3 >nul

:: Start the Frontend Vite Dev Server (Port 3000 with interactive logs)
echo Starting Frontend Vite Dev Server on port 3000...
start "Marca Rise Vite Dev" cmd /c "cd frontend && npm run dev"

echo ----------------------------------------------------
echo DEV SERVERS ARE RUNNING!
echo Frontend (Hot Reload): http://localhost:3000
echo Backend API:           http://localhost:8000
echo ----------------------------------------------------
pause
