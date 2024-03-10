import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import SlidingRow from "../components/slidingRow";
import NavigationBar from "../components/navigationBar";
import Fonts from "../assets/fonts";
import Shadows from "../assets/shadow";
export default NewsSourceScreen = ({ route, navigation }, ...props) => {
  let backButton = () => {
    navigation.goBack();
  };
  const [newsSource, changeNews] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleSquare}>
        <Text style={styles.title}>Popular News Sources</Text>
      </View>
      <View style={styles.top}></View>
      <View style={styles.searchSection}>
        <SlidingRow items={items} />
      </View>

      <View style={styles.buttonView}></View>
      <NavigationBar current={"newspaper-variant-multiple"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slidingRow: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchSection: {
    flex: 2.4,
    marginBottom: 1,
  },

  titleSquare: {
    flex: 1.2,
    alignItems: "center",
    margin: 7,
    borderRadius: 10,
  },
  title: {
    ...Fonts.title,
  },
  title2: {
    ...Fonts.subtitle,
  },

  buttonView: {
    flex: 1,
  },

  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    ...Shadows.basicShadow,
  },
  activeButton: {
    backgroundColor: "black",
    color: "white",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "black",
    ...Fonts.subtitle,
  },
  activeButtonText: {
    color: "white",
  },
  topicsView: {
    flex: 3,
    padding: 10,
  },
});
