import React from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Text,
  SafeAreaView,
} from "react-native";
import Shadows from "./shadow";
import Fonts from "./fonts";
import Colors from "./colors";

function SlidingRow({ items }) {
  // renderItem function to render each item
  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => item.onSelect()} style={styles.sliderItem}>
      <Image source={item.source} style={styles.logo} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.slidingRow}>
      <FlatList
        data={items} // Pass the items array as data
        renderItem={renderItem} // Specify how to render each item
        keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        contentContainerStyle={styles.slider} // Apply styles to the content container of the FlatList
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slidingRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 10,
    aspectRatio: 1,
  },
  sliderItem: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    ...Shadows.basicShadow,
    height: "40%",
  },
});

export default SlidingRow;
