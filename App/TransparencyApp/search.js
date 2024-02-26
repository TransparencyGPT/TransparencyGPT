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
} from "react-native";
import axios from "axios";
import Shadows from "./shadow";
import Fonts from "./fonts";

function Search(props) {
  const updateLoading = () => {
    fetchAnalysis();
  };

  const fetchAnalysis = async () => {
    props.setIsLoading(true); // Begin loading

    let input_type = "url";

    if (props.searchURL == false) {
      input_type = "inputs";
    }

    let dictionary = {
      articleTopic: props.articleTopic,
      newsSource: props.newsSource,
      input_type: input_type,
      url: props.url,
    };
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        data: dictionary,
      });
      props.setAnalysisResult(response.data); // Set the result from the API response
      props.setIsAnalyzed(true); // Mark the analysis as done
    } catch (error) {
      // console.error("Error fetching analysis:", error);
      props.setAnalysisResult({ error: "Failed to fetch analysis" });
      props.displayError();
    } finally {
      props.setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonContainer} onPress={updateLoading}>
        <Text style={styles.buttonText}>SEARCH</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});

export default Search;
