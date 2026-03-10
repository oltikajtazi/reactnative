# Google Maps API Configuration

## Getting a Google Maps API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable the Maps SDK for Android and Maps SDK for iOS**:
   - Go to "APIs & Services" > "Library"
   - Search for "Maps SDK for Android" and enable it
   - Search for "Maps SDK for iOS" and enable it
4. **Create credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Restrict the API key to your app:
     - For Android: Add package name `com.prishtina.problemreporter`
     - For iOS: Add bundle ID `com.prishtina.problemreporter`

## Adding the API Key to Your App

1. **Open `app.json`** in your project root
2. **Replace `YOUR_GOOGLE_MAPS_API_KEY`** with your actual API key in both places:
   ```json
   "ios": {
     "config": {
       "googleMapsApiKey": "YOUR_ACTUAL_API_KEY_HERE"
     }
   },
   "android": {
     "config": {
       "googleMaps": {
         "apiKey": "YOUR_ACTUAL_API_KEY_HERE"
       }
     }
   }
   ```

3. **Restart your app**:
   ```bash
   npm start -- --clear
   ```

## Important Notes

- **Billing**: Google Maps API requires billing to be enabled on your Google Cloud project
- **Usage Limits**: Free tier includes $200 credit per month
- **Security**: Always restrict your API keys to specific platforms and apps
- **Testing**: Test on physical devices as emulators may have limited map functionality

## Troubleshooting

- **Map not loading**: Check that your API key is correct and billing is enabled
- **White screen**: Verify the API key restrictions match your app identifiers
- **Console errors**: Check the device logs for detailed error messages

For more information, visit: https://developers.google.com/maps/documentation