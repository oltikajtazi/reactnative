import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';

import HomeScreen from '../screens/HomeScreen';
import ReportProblemScreen from '../screens/ReportProblemScreen';
import MapScreen from '../screens/MapScreen';
import ReportDetailsScreen from '../screens/ReportDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="HomeScreenStack"
        component={HomeScreen}
        options={{
          title: 'Prishtina Problem Reporter',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ReportDetails"
        component={ReportDetailsScreen}
        options={{
          title: 'Report Details',
        }}
      />
    </Stack.Navigator>
  );
};

const ReportStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="ReportProblemStack"
        component={ReportProblemScreen}
        options={{
          title: 'Report a Problem',
        }}
      />
    </Stack.Navigator>
  );
};

const MapStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="MapScreenStack"
        component={MapScreen}
        options={{
          title: 'Reports Map',
        }}
      />
      <Stack.Screen
        name="MapReportDetails"
        component={ReportDetailsScreen}
        options={{
          title: 'Report Details',
        }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 4,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Reports',
          }}
        />
        <Tab.Screen
          name="Report"
          component={ReportStack}
          options={{
            tabBarLabel: 'Report',
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapStack}
          options={{
            tabBarLabel: 'Map',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
