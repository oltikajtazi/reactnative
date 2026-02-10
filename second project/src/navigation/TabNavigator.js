import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainStackNavigator, AboutStackNavigator, AndroidStackNavigator } from "./StackNavigator";
import IosStackNavigator from "./IosStackNavigator";
import LenovoStackNavigator from "./LenovoStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00BCD4",
        tabBarInactiveTintColor: "lightgray",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#2C3E50",
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Ios"
        component={IosStackNavigator}
        options={{
          tabBarLabel: "iOS",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cellphone-iphone"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Android"
        component={AndroidStackNavigator}
        options={{
          tabBarLabel: "Android",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cellphone-android"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size ?? 26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Lenovo"
        component={LenovoStackNavigator}
        options={{
          tabBarLabel: "Lenovo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="laptop"
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutStackNavigator}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="video-stabilization"
              color={color}
              size={size ?? 26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
