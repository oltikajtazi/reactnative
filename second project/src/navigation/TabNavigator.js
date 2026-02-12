import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MainStackNavigator from "./StackNavigator";
import IosStackNavigator from "./IosStackNavigator";
import AndroidStackNavigator from "./AndroidStackNavigator";
import LenovoStackNavigator from "./LenovoStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="iOS"
        component={IosStackNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="apple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Android"
        component={AndroidStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="android" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
