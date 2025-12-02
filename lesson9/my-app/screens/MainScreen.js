import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-web";

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Go to List Main" onPress={() => navigation.navigate("List")} />
      <Button title="Go to Olti Screen" onPress={() => navigation.navigate("olti")} />

        
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
