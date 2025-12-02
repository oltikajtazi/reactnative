import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-web";

export default function OltiScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Olti Screen</Text>
      <Button title="Go to Main Screen" onPress={() => navigation.navigate("Main")} />
      <Button title="Go to List Screen" onPress={() => navigation.navigate("List")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
