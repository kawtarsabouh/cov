@echo off
echo ================================================
echo   VRide Application - Complete Startup
echo ================================================
echo.
echo [1/4] Checking prerequisites...
echo.

REM Check Java
java -version 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed!
    pause
    exit /b 1
)
echo [OK] Java is installed

REM Check Node
call npm --version 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js/npm is not installed!
    pause
    exit /b 1
)
echo [OK] Node.js is installed
echo.

echo [2/4] Starting Backend Server...
echo.
cd /d "%~dp0backend\vride"
start "VRide Backend" cmd /k "echo Starting Backend... & java -jar target\vride-0.0.1-SNAPSHOT.jar"

echo [3/4] Waiting for backend to initialize (15 seconds)...
timeout /t 15 /nobreak > nul
echo.

echo [4/4] Starting Frontend...
echo.
cd /d "%~dp0frontend\vride"
start "VRide Frontend" cmd /k "echo Starting Frontend... & npm start"

echo.
echo ================================================
echo   VRide is starting!
echo ================================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Wait for both windows to finish loading...
echo The browser should open automatically.
echo.
echo Press any key to close this window (servers will keep running)
pause > nul

