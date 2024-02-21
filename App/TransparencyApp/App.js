import { StatusBar } from "expo-status-bar";
import SubjectivityComponent from "./claude-analysis";
import FinalAnalysis from "./analysis";
import InputInterface from "./interface";
import Search from "./search";

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Button,
  Pressable,
} from "react-native";

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchURL, changeSearch] = useState(true);
  const [topButtom, changeTopButton] = useState("URL");

  const [articleTopic, changeArticle] = React.useState("");
  const [newsSource, changeNews] = React.useState("");
  const [url, changeURL] = React.useState("");

  let searchButton = () => {
    if (!isLoading) {
      changeURL("");
      changeNews("");
      changeArticle("");

      if (searchURL == false) {
        changeSearch(true);
        changeTopButton("URL");
      } else {
        changeSearch(false);
        changeTopButton("Article");
      }
    } else {
      setIsLoading(false);
    }
  };
  if (!isAnalyzed && !isLoading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.top}>
          <Pressable style={styles.topButtom} onPress={searchButton}>
            <Text style={styles.changeModeText}>{topButtom}</Text>
          </Pressable>
        </SafeAreaView>
        <View style={styles.titleSquare}>
          <Text style={styles.title}>TransparencyGPT</Text>
          <Text style={styles.title2}>Know what you are reading!</Text>
        </View>
        <View style={styles.searchSection}>
          <InputInterface
            searchURL={searchURL}
            articleTopic={articleTopic}
            changeArticle={changeArticle}
            newsSource={newsSource}
            changeNews={changeNews}
            url={url}
            changeURL={changeURL}
          ></InputInterface>
        </View>

        <View style={styles.buttonView}>
          <Search
            setAnalysisResult={setAnalysisResult}
            setIsLoading={setIsLoading}
            setIsAnalyzed={setIsAnalyzed}
            articleTopic={articleTopic}
            newsSource={newsSource}
            url={url}
            searchURL={searchURL}
          ></Search>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.analysis}>
        <FinalAnalysis
          articleTopic={articleTopic}
          newsSource={newsSource}
          url={url}
          searchURL={searchURL}
          isLoading={isLoading}
          analysisResult={analysisResult}
          setAnalysisResult={setAnalysisResult}
          setIsAnalyzed={setIsAnalyzed}
        ></FinalAnalysis>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE7D9",
  },
  top: {
    flex: 1.4,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchSection: {
    flex: 2.4,
    marginBottom: 1,
  },

  changeModeText: {
    fontSize: 16,
    color: "gray",
  },

  topButtom: {
    backgroundColor: "#E1D6BC",
    width: 110,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  titleSquare: {
    flex: 1.2,
    alignItems: "center",
    margin: 7,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 17,
  },

  buttonView: {
    flex: 7,
  },
  analysis: {
    flex: 1,
    backgroundColor: "#ECE7D9",
  },
});
