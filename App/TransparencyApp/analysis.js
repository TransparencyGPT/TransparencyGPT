import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Button,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";

function FinalAnalysis(props) {
  let backButton = () => {
    props.setIsAnalyzed(false);
    props.setAnalysisResult(null);
  };

  if (props.isLoading) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.analysisHead}>Analysis Result</Text>
          </View>
          <View style={styles.middleView}></View>
          <View style={styles.buttomView}>
            <Pressable style={styles.buttonContainer} onPress={backButton}>
              <ActivityIndicator color="#FFF" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  let analysisText = props.analysisResult.analysis;
  let spaces = analysisText.indexOf("\n\n");
  let text = analysisText.substring(spaces + 2);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.analysisHead}>Analysis Result</Text>
        </View>
        <View style={styles.middleView}>
          <View style={styles.sectionView}>
            <Text style={styles.subsection}>Score:</Text>
            <Text style={styles.content}>
              {props.analysisResult.subjectivity_score}/10
            </Text>
          </View>
          <View style={styles.sectionView}>
            <Text style={styles.subsection}>Topics:</Text>
            <Text style={styles.content}>{props.analysisResult.topics}</Text>
          </View>
          <View style={styles.sectionView}>
            <Text style={styles.subsection}>Analysis:</Text>
            <Text style={styles.content}>{text}</Text>
          </View>
        </View>
        <View style={styles.buttomView}>
          <Pressable style={styles.buttonContainer} onPress={backButton}>
            <Text style={styles.buttonText}>BACK</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderRadius: 12,
    backgroundColor: "#E1D6BC",
    height: "93%",
    width: "93%",
    padding: 14,
  },

  titleView: { flex: 1.03, alignItems: "center" },
  middleView: { flex: 5 },
  buttomView: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#C33636",
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  analysisHead: {
    fontSize: 22,
    color: "#C33636",
    fontWeight: "bold",
    marginTop: 4,
  },

  sectionView: {
    marginBottom: 12,
  },

  subsection: {
    fontSize: 17,
    fontWeight: "700",
  },

  content: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default FinalAnalysis;
