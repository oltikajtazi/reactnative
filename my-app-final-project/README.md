# Prishtina Problem Reporter

A mobile app for citizens to report and track city infrastructure problems in Prishtina, Kosovo.

## Features

- 📋 **Report Problems**: Citizens can report city issues like trash, potholes, broken lights, damaged sidewalks, and water leaks
- 🗺️ **Map View**: Visualize all reported problems on an interactive map
- 📍 **GPS Location**: Automatically capture location using device GPS
- 📸 **Photo Support**: Take photos or select from gallery when reporting
- 👍 **Upvote**: Confirm or support existing reports
- 🔄 **Status Tracking**: Track status of issues (Reported, In Progress, Fixed)
- 💾 **Local Storage**: Reports saved locally using AsyncStorage
- 📱 **Cross-platform**: Works on both Android and iOS

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Managed React Native development
- **React Navigation** - Navigation between screens
- **Expo Location** - GPS functionality
- **Expo Image Picker** - Camera and photo gallery access
- **React Native Maps** - Map visualization with Google Maps
- **AsyncStorage** - Local data persistence
- **Vector Icons** - Icon library

## Google Maps Integration

The app uses **Google Maps** for the interactive map view. To enable Google Maps:

1. **Get a Google Maps API Key** (see `GOOGLE_MAPS_SETUP.md`)
2. **Add the API key** to `app.json` in both iOS and Android configurations
3. **Enable billing** on your Google Cloud project
4. **Restart the app** with `npm start -- --clear`

**Note**: Google Maps requires a valid API key and billing setup to function properly.

## Project Structure

```
/src
  /screens
    - HomeScreen.js          # List of reports with filtering
    - ReportProblemScreen.js # Form to submit new reports
    - MapScreen.js           # Map view of all reports
    - ReportDetailsScreen.js # Detailed view of a single report
  /components
    - ReportCard.js          # Reusable report card component
  /services
    - reportService.js       # Business logic for managing reports
  /navigation
    - AppNavigator.js        # Navigation configuration
  /styles
    - colors.js              # Color scheme
    - commonStyles.js        # Reusable style definitions
```

## Main Screens

### 1. Home Screen
- Displays all reported problems in a list
- Filterable by status (All, Reported, In Progress, Fixed)
- Shows report statistics at the bottom
- Pull-to-refresh functionality
- Navigate to report details

### 2. Report Problem Screen
- Select problem category (Trash, Pothole, Broken Light, Sidewalk Damage, Water Leak, Other)
- Add photo (camera or gallery)
- Write detailed description
- Capture GPS location automatically
- Submit new report

### 3. Map Screen
- Interactive **Google Maps** showing all problem locations
- Color-coded markers by status
- Legend showing status indicators
- Tap marker to view report details
- Requires Google Maps API key configuration

### 4. Report Details Screen
- View full report information
- Update status
- Share report
- View exact coordinates
- Link to Google Maps

## Report Categories

- 🗑️ **Trash** - Garbage and litter problems
- 🚗 **Pothole** - Road surface damage
- 💡 **Broken Light** - Non-functional street lights
- 🪜 **Sidewalk Damage** - Damaged sidewalks and pavements
- 💧 **Water Leak** - Water leaks and plumbing issues
- 🔧 **Other** - Other infrastructure problems

## Report Status

- 🟡 **Reported** - Issue reported but not yet addressed
- 🔵 **In Progress** - Authorities are working on the issue
- 🟢 **Fixed** - Issue has been resolved

## Getting Started

### Prerequisites

- Node.js and npm
- Expo CLI installed globally: `npm install -g expo-cli`
- Android Studio (for Android) or Xcode (for iOS)
- Expo Go app on your mobile device (for rapid testing)

### Installation

1. Clone the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

#### Option 1: Expo Go (Easiest for testing)
```bash
npm start
# Scan QR code with Expo Go app on your phone
```

#### Option 2: Android
```bash
npm run android
```

#### Option 3: iOS
```bash
npm run ios
```

#### Option 4: Web
```bash
npm run web
```

## Usage

1. **Launch App**: Open the app on your device
2. **View Reports**: Check the home screen for existing reports
3. **Report a Problem**: 
   - Tap the "Report" tab
   - Select category
   - Add photo (optional)
   - Write description
   - Tap "Capture Location"
   - Submit
4. **View on Map**: Switch to "Map" tab to see spatial distribution
5. **Confirm Reports**: Tap upvote button to support existing reports
6. **Track Status**: Check status updates in report details

## API Integration

Currently uses **AsyncStorage** for local data persistence. To integrate with a real backend:

1. Update `src/services/reportService.js`
2. Replace AsyncStorage calls with API requests
3. Suggested backend services:
   - Firebase Realtime Database / Firestore
   - Node.js + Express backend
   - Firebase Cloud Functions

## Sample Data

The app comes with 3 sample reports for demonstration:
- Trash accumulation on Nene Tereza Street
- Pothole on Mother Teresa Boulevard
- Broken street light on Skanderbeg Street

These are auto-loaded on first app launch.

## Permissions Required

- **Location** - To capture GPS coordinates of problems
- **Camera** - To take photos of problems
- **Photo Library** - To select photos from gallery

## Styling

The app uses:
- Custom color scheme in `src/styles/colors.js`
- Reusable StyleSheet components in `src/styles/commonStyles.js`
- Material Design 3 principles
- Responsive design for various screen sizes

## Future Enhancements

- [ ] User authentication
- [ ] Real backend integration
- [ ] Problem categories customization
- [ ] Advanced filtering and search
- [ ] Analytics dashboard
- [ ] Admin panel for status updates
- [ ] Push notifications
- [ ] Offline mode
- [ ] Multi-language support

## Troubleshooting

### App won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start -c`

### Location not working
- Ensure location permissions are granted in device settings
- Check if device has GPS enabled
- Test on physical device (emulators may have limited location support)

### Map not showing
- Verify react-native-maps is properly installed
- Check that device has internet connection
- For Android, ensure you have Google Play Services

### Photos not working
- Grant camera/gallery permissions
- On iOS 14+, check photo library permissions
- Test on physical device if possible

## License

This project is licensed under the MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review React Native and Expo documentation
3. Submit an issue with detailed reproduction steps

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Made with ❤️ for Prishtina Citizens**
