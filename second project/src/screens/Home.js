import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-web";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.buttonText}>GO TO ABOUT SCREEN</Text>
        <Text>click here to open</Text>

        <Button title="Click Me" onPress={() => navigation.openDrawer()} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Home;
