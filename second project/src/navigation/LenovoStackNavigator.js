import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Lenovo from "../screens/Lenovo";

const Stack = createStackNavigator();

const LenovoStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lenovo"
        component={Lenovo}
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

export default LenovoStackNavigator;
