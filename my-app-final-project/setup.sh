#!/bin/bash

# Prishtina Problem Reporter - Setup Script
# This script installs all dependencies for the React Native app

echo "======================================"
echo "Prishtina Problem Reporter Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo "✓ npm version: $(npm -v)"
echo ""

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI globally..."
    npm install -g expo-cli
fi

echo "✓ Expo CLI is installed"
echo ""

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

echo ""
echo "======================================"
echo "✓ Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Run 'npm start' to start the development server"
echo "2. Scan the QR code with Expo Go app (iOS/Android)"
echo "3. Or use 'npm run android' or 'npm run ios'"
echo ""
echo "For more info, see README.md"
echo ""
