@echo off
REM Prishtina Problem Reporter - Setup Script for Windows
REM This script installs all dependencies for the React Native app

echo.
echo ======================================
echo Prishtina Problem Reporter Setup
echo ======================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed.
    echo Please install it from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node -v
echo npm version:
npm -v
echo.

REM Check if Expo CLI is installed
expo --version >nul 2>&1
if errorlevel 1 (
    echo Installing Expo CLI globally...
    call npm install -g expo-cli
)

echo Expo CLI is installed
echo.

REM Install project dependencies
echo Installing project dependencies...
call npm install

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Next steps:
echo 1. Run 'npm start' to start the development server
echo 2. Scan the QR code with Expo Go app (iOS/Android)
echo 3. Or use 'npm run android' or 'npm run ios'
echo.
echo For more info, see README.md
echo.
pause
