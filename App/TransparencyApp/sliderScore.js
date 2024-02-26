import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import fonts from "./fonts";

export default function SliderScore({ score }) {
  // Determine the position of the weight based on the score, with 0.5 being centered
  const weightPosition = score / 10 - 0.5;

  return (
    <SafeAreaView style={styles.scaleContainer}>
      <View style={styles.scaleTrack}>
        <View
          style={[styles.weight, { left: `${50 + weightPosition * 100}%` }]}
        />
      </View>
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>No Bias</Text>
        <Text style={styles.label}>Biased</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scaleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "100%",
  },
  scaleTrack: {
    width: "100%",
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginVertical: 10,
    position: "relative",
  },
  weight: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "black",
    borderRadius: 10,
    top: -8, // Half of the height to center it vertically on the track
    marginLeft: -10, // Half of the width to center it horizontally on its position
  },
  scoreText: {
    fontWeight: "bold",
    textAlign: "center",
    ...fonts.subtitle,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    ...fonts.title,
    fontSize: 14,
  },
});
