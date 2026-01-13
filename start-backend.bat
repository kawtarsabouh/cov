@echo off
echo Starting VRide Backend...
cd /d "%~dp0backend\vride"
java -jar target\vride-0.0.1-SNAPSHOT.jar
pause
