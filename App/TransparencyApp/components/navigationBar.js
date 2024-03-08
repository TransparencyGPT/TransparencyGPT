import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../assets/colors";

const NavigationBar = () => {
  const navigation = useNavigation();

  // Create an object that holds animated values for each icon
  const animations = {
    "view-list-outline": useRef(new Animated.Value(0)).current,
    "briefcase-search-outline": useRef(new Animated.Value(0)).current,
    "newspaper-variant-multiple": useRef(new Animated.Value(0)).current,
  };

  const [selected, setSelected] = useState(null);

  const handlePress = (iconName) => {
    // Perform the navigation based on the icon pressed
    switch (iconName) {
      case "view-list-outline":
        navigation.navigate("Topics");
        Animated.spring(animations["view-list-outline"], {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
        break;
      case "briefcase-search-outline":
        navigation.navigate("Home");
        Animated.spring(animations["briefcase-search-outline"], {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
        break;
      case "newspaper-variant-multiple":
        navigation.navigate("NewsSource");
        Animated.spring(animations["newspaper-variant-multiple"], {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
        break;
    }
  };

  const getAnimatedStyle = (iconName) => ({
    transform: [
      {
        translateY: animations[iconName].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -15], // Icon moves up by 15
        }),
      },
    ],
  });

  return (
    <View style={styles.navBar}>
      {Object.keys(animations).map((iconName) => (
        <TouchableOpacity
          key={iconName}
          style={styles.touchableArea}
          onPress={() => handlePress(iconName)}
        >
          <Animated.View
            style={selected === iconName ? getAnimatedStyle : undefined}
          >
            <Icon name={iconName} style={styles.icon} />
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50, // Adjust the height as needed
    marginBottom: 0,
  },
  touchableArea: {
    flex: 1,
    alignItems: "center", // Center the icon horizontally
    justifyContent: "center", // Center the icon vertically
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  icon: {
    color: "#000",
    fontSize: 30, // Adjust the size as needed
  },
});
