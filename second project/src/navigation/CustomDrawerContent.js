import React from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import theme from "../theme";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const { navigation, darkMode, setDarkMode } = props;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://placekitten.com/80/80" }}
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.name, darkMode ? styles.darkText : { color: theme.colors.text }]}>Dev User</Text>
          <Text style={[styles.email, darkMode ? styles.darkText : { color: theme.colors.muted }]}>dev@local.test</Text>
        </View>
      </View>

      <View style={styles.section}>
        <DrawerItem
          label="Home"
          onPress={() => navigation.navigate("Home")}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size ?? 20} />
          )}
        />

        <DrawerItem
          label={() => (
            <View style={styles.row}>
              <Text style={darkMode ? styles.darkText : { color: theme.colors.text }}>About</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            </View>
          )}
          onPress={() => navigation.navigate("About")}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="information" color={color} size={size ?? 20} />
          )}
        />

        <DrawerItem
          label="Settings"
          onPress={() => navigation.navigate("SettingsPlaceholder")}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size ?? 20} />
          )}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="theme-light-dark" size={20} color={theme.colors.muted} />
            <Text style={[styles.footerText, darkMode && styles.darkText, !darkMode && { color: theme.colors.text }]}>Theme</Text>
          </View>
          <View>
            <Text onPress={() => setDarkMode(!darkMode)} style={[styles.toggleLink, { color: theme.colors.primary }]}>
              {darkMode ? "Light" : "Dark"}
            </Text>
          </View>
        </View>

        <DrawerItem
          label="Logout"
          onPress={handleLogout}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size ?? 20} />
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 0 },
  header: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: "transparent" },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "700" },
  email: { fontSize: 12, color: "gray" },
  section: { marginTop: 8 },
  footer: { marginTop: 24, borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 12 },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 },
  badge: { backgroundColor: theme.colors.accent, borderRadius: 10, paddingHorizontal: 6, marginLeft: 8 },
  badgeText: { color: "white", fontSize: 12 },
  footerText: { marginLeft: 8 },
  toggleLink: { color: theme.colors.primary },
  darkText: { color: "#fff" },
});

export default CustomDrawerContent;
