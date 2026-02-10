import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import data from "../data/data.json";
import Item from "../components/Item";

class Ios extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [],
    };
  }

  componentDidMount() {
    this.setState({
      product: data,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <View style={styles.productsContainer}>
            <FlatList
              data={this.state.product.ios}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Item item={item} />}
            />
          </View>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>View More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Ios;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  desc: {
    marginBottom: 15,
    fontSize: 14,
  },
  productsContainer: {
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#2f3b52",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
  },
});
