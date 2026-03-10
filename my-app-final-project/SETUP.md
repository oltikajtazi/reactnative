# Prishtina Problem Reporter - Setup Instructions

## Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- Git installed (optional but recommended)

### Installation Steps

#### On Windows:
```bash
# 1. Navigate to the project directory
cd c:\Users\Student\Desktop\reactnative\my-app-final-project

# 2. Install all dependencies
npm install

# 3. Start the development server
npm start
```

#### On macOS/Linux:
```bash
# 1. Navigate to the project directory
cd ~/path/to/my-app-final-project

# 2. Install all dependencies
npm install

# 3. Start the development server
npm start
```

## Running the App

### Option 1: Expo Go (Recommended for Testing)
```bash
npm start
```
Then scan the QR code with:
- **iOS**: Camera app or Expo Go app
- **Android**: Expo Go app

### Option 2: Android Emulator
```bash
npm run android
```
Make sure you have Android Studio and an emulator configured.

### Option 3: iOS Simulator (macOS only)
```bash
npm run ios
```

### Option 4: Web Browser
```bash
npm run web
```
Opens the app in your default browser at http://localhost:19006

## Troubleshooting

### Error: "Unable to resolve @react-native-async-storage/async-storage"
**Solution**: Run `npm install` to install all dependencies.

```bash
npm install
```

### Error: "Metro Bundler Error"
**Solution**: Clear the cache and restart:
```bash
npm start -- --clear
# or
npm start -c
```

### Port Already in Use
If port 8081 is already in use:
```bash
npm start -- --port 3000
```

### Android Emulator Issues
Ensure you have:
1. Android Studio installed
2. An emulator created and running
3. Android SDK properly configured

```bash
# List available emulators
emulator -list-avds

# Start an emulator
emulator -avd <emulator_name>
```

### iOS Simulator Issues (macOS)
```bash
# Open iOS simulator
open /Applications/Simulator.app

# Then run
npm run ios
```

### Dependency Issues
If you have persistent issues, try a clean install:
```bash
# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall everything
npm install
```

## Key Dependencies

- **expo**: ~55.0.5 - React Native framework
- **react-navigation**: ^6.1.10 - Navigation library
- **expo-location**: ^17.0.1 - GPS functionality
- **expo-image-picker**: ^15.0.6 - Camera and gallery
- **react-native-maps**: ^1.14.0 - Map display
- **@react-native-async-storage/async-storage**: ^1.23.1 - Local storage

## File Structure

```
/
├── App.js                    # Main entry point
├── index.js                  # Expo entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── README.md                 # Full documentation
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ReportProblemScreen.js
│   │   ├── MapScreen.js
│   │   └── ReportDetailsScreen.js
│   ├── components/
│   │   └── ReportCard.js
│   ├── services/
│   │   └── reportService.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── styles/
│       ├── colors.js
│       └── commonStyles.js
└── assets/                   # Icons and images
```

## Development Tips

1. **Hot Reloading**: Changes auto-reload when you save files
2. **Developer Menu**: Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
3. **Console Logs**: Use `console.log()` - visible in terminal and Expo CLI
4. **Network Issues**: Ensure device is on same WiFi as dev machine

## Building for Production

### Android
```bash
npm run android
# Then use Android Studio to build an APK or AAB
```

### iOS
```bash
npm run ios
# Then use Xcode to build an IPA
```

### EAS Build (Recommended)
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Documentation

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [React Native Maps Docs](https://github.com/react-native-maps/react-native-maps)

## Support

For issues:
1. Check the troubleshooting section above
2. Review the README.md for feature documentation
3. Check Expo CLI error messages carefully
4. Clear cache and reinstall if needed
5. Test on physical device if emulator has issues
