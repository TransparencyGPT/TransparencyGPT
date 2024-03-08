import InputInterface from "../components/interface";
import Search from "../components/search";
import LoadingScreen from "./LoadingScreen";
import * as Font from "expo-font";
import Fonts from "../assets/fonts";
import Shadows from "../assets/shadow";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/navigationBar";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Call preventAutoHideAsync immediately
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchURL, changeSearch] = useState(true);

  const [articleTopic, changeArticle] = React.useState("");
  const [newsSource, changeNews] = React.useState("");
  const [url, changeURL] = React.useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Cutive: require("../assets/Fonts/Cutive-Regular.ttf"),
          Special: require("../assets/Fonts/SpecialElite-Regular.ttf"),
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

  const handleAnalysis = () => {
    navigation.navigate("FinalAnalysis", {
      articleTopic: articleTopic,
      newsSource: newsSource,
      url: url,
      searchURL: searchURL,
      isLoading: isLoading,
      analysisResult: analysisResult,
      setAnalysisResult: setAnalysisResult,
      setIsAnalyzed: setIsAnalyzed,
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationBar />

        <View style={styles.titleSquare}>
          <Text style={styles.title}>TransparencyGPT</Text>
          <Text style={styles.title2}>Know what you are reading!</Text>
        </View>
        <View style={styles.top}>
          <Pressable
            style={[styles.toggleButton, searchURL ? styles.activeButton : {}]}
            onPress={() => toggleSearchMode("URL")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                searchURL ? styles.activeButtonText : {},
              ]}
            >
              Search by URL
            </Text>
          </Pressable>
          <Pressable
            style={[styles.toggleButton, !searchURL ? styles.activeButton : {}]}
            onPress={() => toggleSearchMode("Article")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                !searchURL ? styles.activeButtonText : {},
              ]}
            >
              Search by Title
            </Text>
          </Pressable>
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
            onAnalysisComplete={handleAnalysis}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slidingRow: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
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
  topicsView: {
    flex: 3,
    padding: 10,
  },
});
