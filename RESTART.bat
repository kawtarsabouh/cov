@echo off
color 0A
echo Stopping servers...
taskkill /F /IM java.exe 2>nul
taskkill /F /IM node.exe 2>nul
timeout /t 3 /nobreak >nul

echo.
echo Rebuilding backend...
cd /d "%~dp0backend\vride"
call mvnw.cmd package -DskipTests
if errorlevel 1 (
    echo Backend build failed!
    pause
    exit /b 1
)

echo.
echo Starting backend...
start /MIN "Backend" java -jar target\vride-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2

timeout /t 20 /nobreak >nul

echo.
echo Starting frontend...
cd /d "%~dp0frontend\vride"
start "Frontend" npm start

echo.
echo ==========================================
echo   VRide is starting!
echo   Wait 30 seconds then visit:
echo   http://localhost:3000
echo ==========================================
timeout /t 35 /nobreak
start http://localhost:3000
