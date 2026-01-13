@echo off
echo ================================================
echo     VRide - Demarrage Rapide
echo ================================================
echo.

REM Demarrer le backend
echo [1/2] Demarrage du backend...
cd /d "%~dp0backend\vride"
start "VRide Backend" cmd /k "java -jar target\vride-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2"

REM Attendre 10 secondes
timeout /t 10 /nobreak >nul

REM Demarrer le frontend
echo [2/2] Demarrage du frontend...
cd /d "%~dp0frontend\vride"
start "VRide Frontend" cmd /k "npm start"

echo.
echo ================================================
echo     Les deux serveurs demarrent!
echo     Backend:  http://localhost:8080
echo     Frontend: http://localhost:3000
echo ================================================
echo.
echo Attendez 30 secondes puis ouvrez http://localhost:3000
pause
