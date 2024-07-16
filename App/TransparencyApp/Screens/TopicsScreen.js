import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import Topics from "../components/topics";
import Colors from "../assets/colors";
import NavigationBar from "../components/navigationBar";
import Fonts from "../assets/fonts";
import Shadows from "../assets/shadow";
import LoadingScreen from "../Screens/LoadingScreen";

export default TopicsScreen = ({ route, navigation }, ...props) => {
  const [error, displayError] = useState(false);
  const [buttonList, changeList] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchURL, changeSearch] = useState(true);
  let backButton = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <SafeAreaView style={styles.topicsView}>
        <View style={styles.titleSquare}>
          <Text style={styles.title}>Popular Topics</Text>
        </View>
        <View style={styles.searchSection}>
          <Topics
            buttonList={buttonList}
            changeList={changeList}
            setAnalysisResult={setAnalysisResult}
            setIsLoading={setIsLoading}
            setIsAnalyzed={setIsAnalyzed}
            displayError={displayError}
          />
        </View>

        <View style={styles.buttonView}></View>
        <NavigationBar current={"trending-up"} />
      </SafeAreaView>
    );
  }
};

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
    flex: 7,
    marginBottom: 1,
    marginTop: 0,
  },

  titleSquare: {
    alignItems: "center",
    margin: 7,
  },
  title: {
    ...Fonts.title,
  },

  buttonView: {
    flex: 1,
  },

  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
