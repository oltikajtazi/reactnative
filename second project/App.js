import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./src/navigation/TabNavigator";
import AdvancedDrawer from "./src/navigation/AdvancedDrawer";
export default function App() {
  return (
    <NavigationContainer>
      <AdvancedDrawer />
    </NavigationContainer>
  );
}
