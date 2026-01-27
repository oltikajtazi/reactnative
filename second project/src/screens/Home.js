import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
// removed unused web button import
import Swiper from "react-native-swiper";
import { Image } from "react-native";
import CarouselRow from "../components/CarouselRow";
import theme from "../theme";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const SLIDE_HEIGHT = 320;
const HORIZONTAL_PADDING = 16;
const CARD_WIDTH = WINDOW_WIDTH - HORIZONTAL_PADDING * 2;

const slides = [
  { id: 1, src: require('../../assets/nili.png'), title: 'Welcome to Nili' },
  { id: 2, src: require('../../assets/nature-yuh.png'), title: 'Explore Nature' },
  { id: 3, src: require('../../assets/OIP.webp'), title: 'Featured Poster' },
  { id: 4, src: require('../../assets/pexels-jamshed-ahmad-560590-1315655.jpg'), title: 'City Nights' },
  { id: 5, src: require('../../assets/splash-icon.png'), title: 'Splash' },
];

const movies = [
  { id: 101, src: require('../../assets/nili.png'), title: 'Vanvittig Forelsket' },
  { id: 102, src: require('../../assets/nature-yuh.png'), title: 'Sidste chance, Harvey' },
  { id: 103, src: require('../../assets/OIP.webp'), title: 'Spænding i Vegas' },
  { id: 104, src: require('../../assets/pexels-jamshed-ahmad-560590-1315655.jpg'), title: 'Harry Potter' },
  { id: 105, src: require('../../assets/adaptive-icon.png'), title: 'Detective Noir' },
  { id: 106, src: require('../../assets/icon.png'), title: 'Icon Feature' },
  { id: 107, src: require('../../assets/favicon.png'), title: 'Favourites' },
];

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }] }>

      <Swiper
        style={styles.Swiper}
        showsPagination
        dotColor="rgba(255,255,255,0.45)"
        activeDotColor={theme.colors.surface}
        autoplay
        autoplayTimeout={4}
        loop
        paginationStyle={{ bottom: 10 }}
        showsButtons={false}
      >
        {slides.map((s) => (
          <View key={s.id} style={styles.slide}>
            <View style={styles.card}>
              <Image source={s.src} style={styles.SlideImage} resizeMode="cover" />

              <View style={[styles.caption, { backgroundColor: 'rgba(0,0,0,0.45)' }]} pointerEvents="none">
                <Text style={styles.captionTitle}>{s.title}</Text>
              </View>
            </View>
          </View>
        ))}
      </Swiper>

      <View style={{ width: "100%", paddingHorizontal: 4 }}>
        <CarouselRow title="Aktuelle film" data={movies} />
      </View>

    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
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
  slide: {
    height: SLIDE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  Swiper: {
    height: SLIDE_HEIGHT,
    width: "100%",
  },
  card: {
    width: CARD_WIDTH,
    height: SLIDE_HEIGHT,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
      }
    })
  },
  caption: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  captionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  SlideImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.soft,
  },
    
});

export default Home;