import InputInterface from "../components/interface";
import Search from "../components/search";
import LoadingScreen from "./LoadingScreen";
import * as Font from "expo-font";
import Fonts from "../assets/fonts";
import Shadows from "../assets/shadow";
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../components/navigationBar";
import { Picker } from "@react-native-picker/picker";
import ModalDropdown from "react-native-modal-dropdown";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
  TouchableOpacity,
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
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [articleTopic, changeArticle] = React.useState("");
  const [newsSource, changeNews] = React.useState("");
  const [url, changeURL] = React.useState("");
  const [searchMode, setSearchMode] = useState("URL");

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
        <View style={styles.top}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Search by:</Text>
            <ModalDropdown
              options={["URL", "Title"]}
              defaultValue={"URL"}
              onSelect={(index, value) => toggleSearchMode(value)}
              dropdownStyle={styles.dropdownStyle}
              textStyle={styles.dropdownText}
              defaultIndex={0}
              adjustFrame={(style) => {
                style.top += 5;
                style.left -= 15;
                return style;
              }}
              renderRow={(option, index, isSelected) => (
                <View style={styles.dropdownRow}>
                  <Text
                    style={[
                      styles.dropdownRowText,
                      isSelected && styles.selectedRow,
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              )}
            />
          </View>
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
        <NavigationBar current={"search-web"} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchSection: {
    flex: 2,
    marginBottom: 1,
  },
  pickerContainer: {
    height: 50,
    width: 150,
    margin: 20,
    borderWidth: 2,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    ...Shadows.basicShadow,
  },

  dropdownStyle: {
    width: 152,
    height: 60,
    marginLeft: 13,
    backgroundColor: "black",
    borderBottomColor: "black",
    borderRadius: 6,
  },
  dropdownText: {
    ...Fonts.subtitle,
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  dropdownRow: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropdownRowText: {
    ...Fonts.subtitle,
    color: "gray",
    fontSize: 16,
  },
  selectedRow: {
    ...Fonts.subtitle,
    color: "white",
    fontSize: 16,
  },
  pickerLabel: {
    position: "absolute",
    backgroundColor: "white",
    top: -14,
    left: 10,
    padding: 5,
    fontSize: 16,
    ...Fonts.subtitle,
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
    flex: 3,
    marginVertical: 20,
  },

  top: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  toggleButton: {
    marginVertical: 20,
    width: 250,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    ...Shadows.basicShadow,
  },

  topicsView: {
    flex: 3,
    padding: 10,
  },
});
