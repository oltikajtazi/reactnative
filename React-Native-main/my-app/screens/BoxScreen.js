import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BoxScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>flexDirection: 'row'</Text>

      <View style={styles.boxArea}>
        <View style={[styles.box, { backgroundColor: "powderblue" }]} />
        <View style={[styles.box, { backgroundColor: "skyblue" }]} />
        <View style={[styles.box, { backgroundColor: "steelblue" }]} />
      </View>

      {/* <Text style={[styles.title, { marginTop: 24 }]}>
        flexDirection: 'row-reverse'
      </Text>

      <View style={[styles.boxArea, { flexDirection: "column" }]}>
        <View style={[styles.box, { backgroundColor: "powderblue" }]} />
        <View style={[styles.box, { backgroundColor: "skyblue" }]} />
        <View style={[styles.box, { backgroundColor: "steelblue" }]} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  boxArea: {
    width: "100%",
    height: "100%",

    backgroundColor: "#eaf4fb",
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 50,
    height: 50,
  },
});

export default BoxScreen;
