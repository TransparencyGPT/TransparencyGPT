import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";

function AnalysisComponent() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const [articleTopic, changeArticle] = React.useState('');
  const [newsSource, changeNews] = React.useState('');

  const fetchAnalysis = async () => {
    setIsLoading(true); // Begin loading
    let dictionary = {"articleTopic": articleTopic, "newsSource": newsSource }
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        data: dictionary,
      });
      setAnalysisResult(response.data); // Set the result from the API response
      setIsAnalyzed(true); // Mark the analysis as done
    } catch (error) {
      console.error("Error fetching analysis:", error);123
      setAnalysisResult({ error: "Failed to fetch analysis" });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setIsAnalyzed(false);
  };

  return (
    <View style={styles.container}>
      {!isAnalyzed && (
      <>
      <TextInput
        style={styles.input}
        onChangeText={changeArticle}
        value={articleTopic}
        placeholder="Article Title"
        
      />
        <TextInput
        style={styles.input}
        onChangeText={changeNews}
        value={newsSource}
        placeholder="News Source"
      />

        <TouchableOpacity
          style={styles.button}
          onPress={fetchAnalysis}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>
              Analyze Preloaded Text for Subjectivity
            </Text>
          )}
        </TouchableOpacity>
        </>
      )}
      {isAnalyzed && (
        <View style={styles.resultContainer}>
          {analysisResult.error ? (
            <Text style={styles.errorText}>{analysisResult.error}</Text>
          ) : (
            <>
              <Text style={styles.heading}>Analysis Result:</Text>
              <Text style={styles.text}>Topics: {analysisResult.topics}</Text>
              <Text style={styles.text}>
                Subjectivity Score: {analysisResult.subjectivity_score}
              </Text>
              <Text style={styles.text}>
                Analysis: {analysisResult.analysis}
              </Text>
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={resetAnalysis}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "#FFA07A",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: "auto", // Ensure the button has a fixed height for the loader
    width: "auto", // Standard width for better aesthetics
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  resultContainer: {
    alignItems: "center",
    backgroundColor: "#FFFACD",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DB7093",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#6A5ACD",
    marginBottom: 10,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: "100%",
  },
});

export default AnalysisComponent;
