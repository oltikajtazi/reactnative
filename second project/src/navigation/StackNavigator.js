import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Single from "../screens/Single";

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
      <Stack.Screen
        name="Single"
        component={Single}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
};



export default MainStackNavigator
