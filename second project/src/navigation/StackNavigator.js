import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import About from "../screens/About";
import Android from "../screens/Android";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#2C3E50",
  },
  headerTintColor: "#00BCD4",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AboutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const AndroidStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Android"
        component={Android}
        options={{
          headerStyle: {
            backgroundColor: "#2f3b52",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, AboutStackNavigator, AndroidStackNavigator };
