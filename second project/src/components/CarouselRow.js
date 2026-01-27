import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import theme from "../theme";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 140;
const ITEM_SPACING = 12;

const CarouselRow = ({ title = "Featured", data = [] }) => {
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (newIndex) => {
    const safe = Math.max(0, Math.min(newIndex, Math.max(0, data.length - 1)));
    setIndex(safe);
    if (listRef.current && typeof listRef.current.scrollToIndex === "function") {
      try {
        listRef.current.scrollToIndex({ index: safe, animated: true, viewPosition: 0.5 });
      } catch (e) {
        // fall back to scrollToOffset
        listRef.current.scrollToOffset({ offset: safe * (ITEM_WIDTH + ITEM_SPACING), animated: true });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{data.length} film</Text>
      </View>

      <View style={styles.listRow}>
        <TouchableOpacity onPress={() => scrollTo(index - 1)} style={styles.arrow} accessibilityLabel="Previous">
          <Text style={styles.arrowText}>{'‹'}</Text>
        </TouchableOpacity>

        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          snapToInterval={ITEM_WIDTH + ITEM_SPACING}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View style={[styles.item, { width: ITEM_WIDTH, marginRight: ITEM_SPACING }]}>
              <Image source={item.src} style={styles.poster} resizeMode="cover" />
              <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
              <TouchableOpacity style={styles.ticketBtn} onPress={() => {}}>
                <Text style={styles.ticketText}>Billetter</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity onPress={() => scrollTo(index + 1)} style={styles.arrow} accessibilityLabel="Next">
          <Text style={styles.arrowText}>{'›'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: "700", color: theme.colors.text },
  count: { fontSize: 12, color: theme.colors.muted },
  listRow: { flexDirection: "row", alignItems: "center" },
  arrow: {
    width: 34,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: { fontSize: 28, color: theme.colors.muted },
  item: { alignItems: "center" },
  poster: {
    width: ITEM_WIDTH,
    height: Math.round(ITEM_WIDTH * 1.5),
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.soft,
  },
  itemTitle: { fontSize: 13, marginTop: 8, color: theme.colors.text, width: ITEM_WIDTH, textAlign: "center" },
  ticketBtn: {
    marginTop: 6,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  ticketText: { color: theme.colors.surface, fontSize: 12, fontWeight: "700" },
});

export default CarouselRow;
