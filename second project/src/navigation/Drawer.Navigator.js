import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";
import CustomDrawerContent from "./CustomDrawerContent";
import theme from "../theme";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [darkMode, setDarkMode] = useState(false);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      drawerActiveTintColor: darkMode ? theme.colors.surface : theme.colors.accent,
      drawerInactiveTintColor: darkMode ? "#bbb" : theme.colors.muted,
      drawerStyle: {
        backgroundColor: darkMode ? "#0b0b0b" : theme.colors.surface,
      },
    }),
    [darkMode]
  );

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size ?? 22} />
          ),
        }}
      />

      <Drawer.Screen
        name="About"
        component={AboutStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color={color} size={size ?? 22} />
          ),
        }}
      />

      <Drawer.Screen name="SettingsPlaceholder">
        {() => (
          <View style={styles.center}>
            <Text>Settings & advanced options</Text>
          </View>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DrawerNavigator;