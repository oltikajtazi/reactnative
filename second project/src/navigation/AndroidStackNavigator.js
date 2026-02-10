import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ios from "../screens/Android";
import Android from "../screens/Android";

const Stack = createStackNavigator();

const AndroidStackNavigator = () => {
  return (
    <Stack.Navigator>
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

export default AndroidStackNavigator;
