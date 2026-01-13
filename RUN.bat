@echo off
title VRide Startup
color 0A

echo ========================================
echo   VRide - Demarrage Simple
echo ========================================
echo.

REM Arreter les anciens processus
taskkill /F /IM node.exe 2>nul
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul

REM Demarrer Backend
echo [1/2] Demarrage Backend...
cd /d "%~dp0backend\vride"
start /MIN "VRide-Backend" cmd /c "java -jar target\vride-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2"

REM Attendre 15 secondes
timeout /t 15 /nobreak >nul

REM Demarrer Frontend
echo [2/2] Demarrage Frontend...
cd /d "%~dp0frontend\vride"
start /MIN "VRide-Frontend" cmd /c "npm start"

echo.
echo ========================================
echo   ATTENDEZ 30 SECONDES puis ouvrez:
echo   http://localhost:3000
echo ========================================
echo.
timeout /t 35 /nobreak
start http://localhost:3000
