import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper";
import Icon from "../components/Icons";


import Item from "../components/item";
import data from "../data/data.json"
import { FlatList } from "react-native-web";

const Home = () => {

  const [products,setProducts]=useState([]);

  useEffect(()=>{
    setProducts(data.popularproducts);
  },[])


  
  return (
    <FlatList 
    ListHeaderComponent={
      <>
      
        <Swiper
        style={styles.swiper}
        showsPagination
        dotColor="#999"
        activeDotColor="#007AFF"
      >
        <View style={styles.slide}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.slideImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/image1.jpg")}
            style={styles.slideImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/image1.jpg")}
            style={styles.slideImage}
            resizeMode="cover"
          />
        </View>
      </Swiper>

      <View style={styles.iconsContainer}>
        <Icon name="cellphone-iphone" iconText="iPhone" />
        <Icon name="android" iconText="Samsung" />
        <Icon name="laptop" iconText="Laptop" />
      </View>

      <View style={styles.iconsContainer}>
        <Icon name="tablet" iconText="Tablet" />
        <Icon name="mouse" iconText="Mouse" />
        <Icon name="keyboard-outline" iconText="Keyboard" />
      </View>
      
      
      </>



    } 
    data={products}
    keyExtractor={(item)=>item.id.toString()}
    renderItem={({item})=><Item item={item}/>}
    contentContainerStyle={styles.listContainer}
   
    
   


    />
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  swiper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  slideImage: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  iconsContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  
});

export default Home;