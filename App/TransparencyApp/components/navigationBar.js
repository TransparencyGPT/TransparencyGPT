import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../assets/colors";
import Shadows from "../assets/shadow";
// Import BlurView from 'expo-blur' if you're using Expo
// import { BlurView } from 'expo-blur';

const NavigationBar = ({ current }) => {
  const icons = [
    { name: "trending-up", screen: "Topics" },
    { name: "search-web", screen: "Home" },
    { name: "newspaper-variant-multiple", screen: "NewsSource" },
  ];
  const navigation = useNavigation();

  const [selected, setSelected] = useState(null);

  const handlePress = (iconName, index) => {
    setSelected(index);

    const icon = icons.find((i) => i.name === iconName);
    if (icon) {
      navigation.navigate(icon.screen);
    }
  };

  const iconStyle = (name) => {
    if (name === current) {
      return styles.floatingIcon;
    } else {
      return styles.icon;
    }
  };
  const viewStyle = (name) => {
    if (name === current) {
      return styles.floatingView;
    } else {
      return styles.View;
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 34,
        paddingBottom: 20,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          marginTop: 20,
          marginBottom: 20,
          width: "100%",
        }}
      >
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={icon.name}
            style={styles.touchableArea}
            onPress={() => handlePress(icon.name, index)}
          >
            <View style={viewStyle(icon.name)}>
              <Icon name={icon.name} style={iconStyle(icon.name)} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  touchableArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 35,
  },
  floatingIcon: {
    fontSize: 45,
    color: "white",
  },
  floatingView: {
    ...Shadows.basicShadow,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 50,
  },
  View: {
    padding: 10,
    borderRadius: 50,
  },
});
