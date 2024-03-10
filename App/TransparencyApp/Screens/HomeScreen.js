import InputInterface from "../components/interface";
import Search from "../components/search";
import LoadingScreen from "./LoadingScreen";
import * as Font from "expo-font";
import Fonts from "../assets/fonts";
import Shadows from "../assets/shadow";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/navigationBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import fonts from "../assets/fonts";

// Call preventAutoHideAsync immediately
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const icons = [
    { name: "trending-up", screen: "Topics" },
    { name: "search-web", screen: "Search" },
    { name: "newspaper-variant-multiple", screen: "NewsSource" },
  ];
  const navigation = useNavigation();

  const handlePress = (iconName) => {
    const icon = icons.find((i) => i.name === iconName);
    if (icon) {
      navigation.navigate(icon.screen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleSquare}>
        <Text style={styles.title}>TransparencyGPT</Text>
        <Text style={styles.title2}>Know what you are reading!</Text>
      </View>
      <View style={styles.main}>
        <TouchableOpacity
          key={"trending-up"}
          style={styles.touchableArea}
          onPress={() => handlePress("trending-up")}
        >
          <View style={styles.bar}>
            <Icon name={"trending-up"} style={{ fontSize: 50 }} />
            <Text style={{ ...Fonts.loading }}> Analyze Popular Topics </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          key={"search-web"}
          style={styles.touchableArea}
          onPress={() => handlePress("search-web")}
        >
          <View style={styles.bar}>
            <Icon name={"search-web"} style={{ fontSize: 50 }} />
            <Text style={{ ...Fonts.loading }}> Analyze Articles </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          key={"newspaper-variant-multiple"}
          style={styles.touchableArea}
          onPress={() => handlePress("newspaper-variant-multiple")}
        >
          <View style={styles.bar}>
            <Icon
              name={"newspaper-variant-multiple"}
              style={{ fontSize: 50 }}
            />
            <Text style={{ ...Fonts.loading }}> Analyze News Sources </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    width: 300,
    justifyContent: "center",
    borderRadius: 10,
    ...Shadows.strongShadow,
    marginVertical: 20,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  titleSquare: {
    alignItems: "center",
    margin: 7,
    borderRadius: 10,
  },
  title: {
    ...Fonts.title,
    color: "white",
  },
  title2: {
    ...Fonts.subtitle,
    color: "white",
  },

  main: {
    flexDirection: "column",
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
