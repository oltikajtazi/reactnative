import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { initializeReports } from './src/services/reportService';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/styles/colors';

export default function App() {
  useEffect(() => {
    // Initialize reports with sample data on app launch
    initializeReports();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />
      <AppNavigator />
    </>
  );
}
