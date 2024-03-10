import React from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Text,
  View,
} from "react-native";
import Shadows from "../assets/shadow";
import Fonts from "../assets/fonts";
import Colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";

function SlidingRow({ items }) {
  const navigation = useNavigation(); // Use the navigation hook

  // renderItem function to render each item
  const renderItem = ({ item, index }) => (
    <Pressable
      key={index}
      onPress={() => navigation.navigate(item.page)} // Corrected this line
      style={styles.sliderItem}
    >
      <Image source={item.source} style={styles.logo} />
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={items} // Pass the items array as data
        renderItem={renderItem} // Specify how to render each item
        keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        horizontal={false} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        contentContainerStyle={styles.slider} // Apply styles to the content container of the FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 10,
    aspectRatio: 1,
  },
  sliderItem: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    ...Shadows.basicShadow,
    height: 200,
    width: "auto",
    marginHorizontal: 40,
  },
});

export default SlidingRow;
