import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import Topics from "../components/topics";
import Colors from "../assets/colors";
import NavigationBar from "../components/navigationBar";
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

  return (
    <SafeAreaView style={styles.topicsView}>
      <Topics
        buttonList={buttonList}
        changeList={changeList}
        setAnalysisResult={setAnalysisResult}
        setIsLoading={setIsLoading}
        setIsAnalyzed={setIsAnalyzed}
        displayError={displayError}
      />

      <View style={styles.buttonView}>
        <Pressable style={styles.buttonContainer} onPress={backButton}>
          <Text style={styles.buttonText}>BACK</Text>
        </Pressable>
      </View>
      <NavigationBar current={"trending-up"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topicsView: {},
  buttonView: {
    flex: 1,
  },
});
