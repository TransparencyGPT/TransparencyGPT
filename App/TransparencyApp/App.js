import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import FinalAnalysis from "./analysis";
import InputInterface from "./interface";
import Search from "./search";
import LoadingScreen from "./loading";
import Fonts from "./fonts";
import Shadows from "./shadow";
import SliderScore from "./sliderScore";

// Call preventAutoHideAsync immediately
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchURL, changeSearch] = useState(true);
  const [articleTopic, changeArticle] = useState("");
  const [newsSource, changeNews] = useState("");
  const [url, changeURL] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Cutive: require("./assets/Cutive-Regular.ttf"),
          Special: require("./assets/SpecialElite-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

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
    flex: 1,
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
