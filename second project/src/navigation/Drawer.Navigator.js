import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [darkMode, setDarkMode] = useState(false);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      drawerActiveTintColor: darkMode ? "#fff" : "#FF6347",
      drawerInactiveTintColor: darkMode ? "#bbb" : "#666",
      drawerStyle: {
        backgroundColor: darkMode ? "#111" : "#fff",
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

      <Drawer.Screen
        name="SettingsPlaceholder"
        component={() => (
          <View style={styles.center}><Text>Settings & advanced options</Text></View>
        )}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size ?? 22} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DrawerNavigator;
import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

const Drawer.Navigator = () => {
  const [darkMode, setDarkMode] = useState(false);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      drawerActiveTintColor: darkMode ? "#fff" : "#FF6347",
      drawerInactiveTintColor: darkMode ? "#bbb" : "#666",
      drawerStyle: {
        backgroundColor: darkMode ? "#111" : "#fff",
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

      <Drawer.Screen
        name="SettingsPlaceholder"
        component={() => (
          <View style={styles.center}><Text>Settings & advanced options</Text></View>
        )}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size ?? 22} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DrawerNavigator;
import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [darkMode, setDarkMode] = useState(false);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      drawerActiveTintColor: darkMode ? "#fff" : "#FF6347",
      drawerInactiveTintColor: darkMode ? "#bbb" : "#666",
      drawerStyle: {
        backgroundColor: darkMode ? "#111" : "#fff",
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

      <Drawer.Screen
        name="SettingsPlaceholder"
        component={() => (
          <View style={styles.center}><Text>Settings & advanced options</Text></View>
        )}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size ?? 22} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DrawerNavigator;


import react from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import  BottomTabNavigator from "./TabNavigator";
import { AboutStackNavigator } from "./StackNavigator";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={BottomTabNavigator} />



        <Drawer.Screen name="About" component={AboutStackNavigator} />


    </Drawer.Navigator>
    );
};

   
export default  DrawerNavigator;