import { View, Text, StyleSheet, Button } from "react-native";

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <Button
        title="Go to List Screen"
        onPress={() => navigation.navigate("List")}
      />
     
    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
