import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import Fonts from "./fonts";

const funFacts = [
  "Since 1929, 40 per cent of the newspapers in the United States hare either closed up shop or been consolidated into a newspaper chain. ",
  "Fake news examples have also come in the form of hoaxes, such as Orson Welles’ notorious 1938 radio broadcast about an alien invasion that led many listeners to panic.",
  " In a six-week period around the time of the 2016 presidential election, research suggests that as many as 25% of Americans visited a fake news website.",
  "An analysis of Facebook news around this same election found that the top 20 fake news stories generated more engagement than the top 20 credible news stories (from major news outlets)",
];
export default function LoadingScreen() {
  const [fact, setFact] = useState(funFacts[0]);
  const rotation = new Animated.Value(0);

  const spin = () => {
    rotation.setValue(0); // reset the animated value
    Animated.timing(rotation, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true, // Add this line
    }).start(() => spin()); // Start the animation again in a loop
  };
  spin();

  useEffect(() => {
    let intervalId = setInterval(() => {
      setFact(
        (prevFact) =>
          funFacts[(funFacts.indexOf(prevFact) + 1) % funFacts.length]
      );
    }, 8000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./assets/transparencyGPT-logo.jpg")}
        style={[styles.icon, { transform: [{ rotate: rotationInterpolate }] }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.loadingText}>LOADING...</Text>
        <Text style={styles.factText}>{fact}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align to top
    alignItems: "center",
    backgroundColor: "#fff", // Or any other background color
    paddingTop: 200, // Or any other value to position the icon
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 40,
    top: "10%",
  },
  textContainer: {
    position: "absolute", // Overlay text on the container
    top: "60%", // Center vertically
    left: 0,
    right: 0,
    alignItems: "center",
    marginHorizontal: 20,
  },
  loadingText: {
    ...Fonts.loading,
  },
  factText: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10, // Space between "LOADING..." and the fact
    ...Fonts.loadingFact,
  },
});
