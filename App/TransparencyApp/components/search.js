import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import axios from "axios";
import Shadows from "../assets/shadow";
import Fonts from "../assets/fonts";
import { useNavigation } from "@react-navigation/native";

function Search(props) {
  const navigation = useNavigation(); // Use the navigation hook

  const fetchAnalysis = async () => {
    props.setIsLoading(true); // Begin loading

    // Determine the input type
    const input_type = props.searchURL ? "url" : "article";
    // Construct the dictionary based on the input type
    const dictionary = props.searchURL
      ? { url: props.url }
      : { articleTopic: props.articleTopic, newsSource: props.newsSource };

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        data: dictionary,
        input_type: input_type,
      });

      props.setAnalysisResult(response.data);

      navigation.navigate("FinalAnalysis", { analysisResult: response.data });
    } catch (error) {
      props.setAnalysisResult({ error: "Failed to fetch analysis" });
      props.displayError();
    } finally {
      props.setIsLoading(false); // End loading
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonContainer} onPress={fetchAnalysis}>
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
