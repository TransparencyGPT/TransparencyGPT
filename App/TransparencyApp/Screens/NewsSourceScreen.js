import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import SlidingRow from "../components/slidingRow";
import NavigationBar from "../components/navigationBar";
export default NewsSourceScreen = ({ route, navigation }, ...props) => {
  let backButton = () => {
    navigation.goBack();
  };
  const [newsSource, changeNews] = React.useState("");

  return (
    <SafeAreaView style={styles.slidingRow}>
      <NavigationBar />

      <SlidingRow items={items} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topicsView: {
    flex: 10,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
