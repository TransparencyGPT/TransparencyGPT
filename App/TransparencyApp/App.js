import { StatusBar } from "expo-status-bar";
import FinalAnalysis from "./analysis";
import InputInterface from "./interface";
import Search from "./search";
import LoadingScreen from "./loading";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Fonts from "./fonts";
import Shadows from "./shadow";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Button,
  Pressable,
  Alert,
} from "react-native";

const fetchFonts = () => {
  return Font.loadAsync({
    Cutive: require("./assets/Cutive-Regular.ttf"),
    Special: require("./assets/SpecialElite-Regular.ttf"),
  });
};

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchURL, changeSearch] = useState(true);
  const [topButtom, changeTopButton] = useState("URL");

  const [articleTopic, changeArticle] = React.useState("");
  const [newsSource, changeNews] = React.useState("");
  const [url, changeURL] = React.useState("");
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.warn(err)}
      />
    );
  } else {
    let displayError = () => {
      const createTwoButtonAlert = () =>
        Alert.alert("Invalid Article!", "Please Try Again!", [{ text: "OK" }]);
      createTwoButtonAlert();
    };

    let toggleSearchMode = (mode) => {
      if (!isLoading) {
        changeURL("");
        changeNews("");
        changeArticle("");
        changeSearch(mode === "URL");
      }
    };

    if (isLoading) {
      return <LoadingScreen />;
    } else {
      if (!isAnalyzed && !isLoading) {
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.top}>
              <Pressable
                style={[
                  styles.toggleButton,
                  searchURL ? styles.activeButton : {},
                ]}
                onPress={() => toggleSearchMode("URL")}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    searchURL ? styles.activeButtonText : {},
                  ]}
                >
                  URL
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.toggleButton,
                  !searchURL ? styles.activeButton : {},
                ]}
                onPress={() => toggleSearchMode("Article")}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    !searchURL ? styles.activeButtonText : {},
                  ]}
                >
                  Article
                </Text>
              </Pressable>
            </View>
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
                displayError={displayError}
              ></Search>
            </View>
          </SafeAreaView>
        );
      } else {
        return (
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
        );
      }
    }
  }
}

const styles = StyleSheet.create({
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
    flex: 7,
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
});
