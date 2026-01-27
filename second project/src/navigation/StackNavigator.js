import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import theme from "../theme";

import Home from "../screens/Home";
import About from "../screens/About";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: theme.colors.accent,
  },
  headerTintColor: "white",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
};

const AboutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="AboutScreen" component={About} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, AboutStackNavigator };
