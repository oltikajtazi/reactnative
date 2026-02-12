import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Single = ({ route, navigation }) => {
  const item = route?.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.Image} />
      </View>
      <View style={styles.cardholder}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => alert("Added to cart")}
      >
        <Text style={styles.btnText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Single;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  Image: {
    width: 300,
    height: 300,
  },
  cardholder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c2c54",
  },
  price: {
    fontSize: 16,
    color: "#2c2c54",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#2c2c54",
    marginTop: 10,
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#2c2c54",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

   