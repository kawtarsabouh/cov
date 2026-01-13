@echo off
taskkill /F /IM java.exe 2>nul
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
cd /d "%~dp0backend\vride"
start "Backend" java -jar target\vride-0.0.1-SNAPSHOT.jar --spring.profiles.active=h2
timeout /t 15 /nobreak >nul
cd /d "%~dp0frontend\vride"
start npm start
timeout /t 30 /nobreak
start http://localhost:3000
