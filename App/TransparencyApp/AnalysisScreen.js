import React, { useState } from "react";
import SliderScore from "./components/sliderScore";
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
  ScrollView,
} from "react-native";
import Fonts from "./assets/fonts";
import Shadows from "./assets/shadow";

function FinalAnalysis({ route, navigation }, ...props) {
  const { analysisResult } = route.params;

  let backButton = () => {
    navigation.goBack();
  };

  if (props.isLoading) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.containerEmpty}>
          <View style={styles.titleView}>
            <Text style={styles.analysisHead}>Analysis Result</Text>
          </View>

          <View style={styles.middleView}>
            <ScrollView style={styles.scroll}>
              <View style={styles.innerMiddleView}>
                <View style={styles.sectionView}>
                  <Text style={styles.content}></Text>
                </View>
                <View style={styles.sectionView}></View>
                <View style={styles.sectionView}></View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.buttomView}>
            <Pressable style={styles.buttonContainer} onPress={backButton}>
              <ActivityIndicator color="#FFF" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  let article_analysis = analysisResult.text_analysis;
  let article_spaces = article_analysis.indexOf("\n\n");
  let article_text = article_analysis.substring(article_spaces + 2);
  let source_text = analysisResult.GPT_answer;

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.analysisHead}>Analysis Result</Text>
        </View>
        <View style={styles.middleView}>
          <ScrollView style={styles.scroll}>
            <View style={styles.innerMiddleView}>
              <View style={styles.sectionView}>
                <SliderScore score={analysisResult.subjectivity_score} />
              </View>
              <View style={styles.sectionView}>
                <Text style={styles.subsection}>Source Analysis:</Text>
                <Text style={styles.content}>{source_text}</Text>
              </View>
              <View style={styles.sectionView}>
                <Text style={styles.subsection}>Article Analysis:</Text>
                <Text style={styles.content}>{article_text}</Text>
              </View>
            </View>
          </ScrollView>
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
    color: "white",
  },
  container: {
    borderRadius: 12,
    backgroundColor: "white",
    height: "93%",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  containerEmpty: {
    borderRadius: 12,
    height: "93%",
    padding: 14,
    width: "93%",
  },

  titleView: { flex: 1.03, alignItems: "center" },

  middleView: { flex: 8 },

  scroll: {},
  innerMiddleView: { width: "93%" },

  buttomView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    ...Shadows.strongShadow,
  },

  buttonText: {
    ...Fonts.subtitle,
    fontSize: 24,
    color: "black",
  },

  analysisHead: {
    fontSize: 22,
    color: "black",
    fontWeight: "bold",
    marginTop: 4,
    ...Fonts.title,
  },

  sectionView: {
    marginBottom: 12,
  },

  subsection: {
    fontWeight: "700",
    ...Fonts.loading,
    fontSize: 15,
  },

  content: {
    ...Fonts.loadingFact,
    fontSize: 11,
    fontWeight: "400",
  },
});

export default FinalAnalysis;
