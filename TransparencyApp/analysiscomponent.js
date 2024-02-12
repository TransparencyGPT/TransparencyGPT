import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

function FinalAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const fetchAnalysis = async () => {
    const source = {
      title:
        "Donald Trump wins again, as former president quickly beats Nikki Haley in New Hampshire GOP primary",
      author: "Paul Steinhauser",
      url: "https://www.foxnews.com/politics/donald-trump-dominates-again-as-former-president-easily-beats-nikki-haley-in-new-hampshire-gop-primary",
      text: 'MANCHESTER, N.H. - Former President Donald Trump did it again. Eight days after he crushed the competition in Iowa\'s low-turnout Republican presidential caucuses, Trump quickly defeated Nikki Haley - his final remaining major rival for the GOP nomination - in Tuesday\'s New Hampshire primary. Fox News projected Trump would win the primary just a few minutes after the final polls closed in New Hampshire. "I’m very honored by the result," Trump told Fox News Digital\'s Brooke Singman in a statement. Haley said in a speech to supporters in Concord, New Hampshire after the race was called that "I want to congratulate Donald Trump on his victory tonight. He earned it and I want to acknowledge that." When asked if he felt Haley would suspend her campaign, Trump told Fox News Digital that he didn\'t know but "she should." But as the votes continued to be tabulated late on Tuesday night, the former president\'s lead over Haley hovered roughly at a ten to eleven point margin, below what most of the final public opinion surveys conducted ahead of the primary had suggested. And Haley emphasized her campaign would continue. "Now you’ve all heard the chatter among the political class. They’re falling all over themselves saying this race is over. Well, I have news for all of them: New Hampshire is first in the nation. It is not last in the nation. This race is far from over." Trump, speaking to supporters in Nashua, New Hampshire about an hour later, argued that Haley "ran up to the stage all dressed up nicely" and delivered "a speech like she won. She didn’t’ win. She lost." "Let’s not have somebody take a victory when she had a very bad night. She had a very bad night," Trump emphasized. For Haley, a former two-term South Carolina governor who served as U.N. ambassador in the Trump administration, the New Hampshire primary was seen as her best and possibly last chance to slow down or derail the former president\'s march towards renomination. New Hampshire – where independent voters who make up roughly 40% of the electorate can vote in either major party\'s contest and have long played an influential role in the state\'s storied presidential primary – was considered fertile ground for Haley. And Haley spent plenty of time and resources in the state, and secured the influential endorsement of popular Republican Gov. Chris Sununu of New Hampshire. With Florida Gov. Ron DeSantis dropping out of the race on Sunday, a GOP presidential field that topped a dozen candidates last summer is now down to two major candidates. "Now we’re the last one standing next to Donald Trump. And today we got close to half the vote. We still have ways to go, but we still keep moving up," Haley emphasized. Haley\'s home state of South Carolina holds the next major contest in the Republican calendar - but the primary isn\'t until Feb. 24. Haley repeatedly insisted in recent days that she would be marching on to South Carolina. And Haley on Tuesday night stressed that "there are dozens of states left to go. And the next one is my sweet state of South Carolina." A source in Haley\'s political orbit told Fox News that there are "now two states where Trump got barely half the vote. That\'s incredibly weak for an incumbent." For Trump, the victory in New Hampshire following his big win in Iowa moves him another step closer to his goal of winning back the White House. At the dawn of 2023, the former president was the only declared candidate in the race for the Republican nomination, but he was far from a sure thing. A year later, the former president once again holds massive sway over the party. Helping to boost his standing - Trump\'s legal difficulties. Trump made history last year as the first former or current president to be indicted for a crime. But his four indictments, including charges he tried to overturn his 2020 presidential election loss to President Biden, have only fueled his support among Republican voters.',
    };
    setIsLoading(true); // Begin loading
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        author: source.author,
        url: source.url,
        title: source.title,
        article: source.text,
      });
      setAnalysisResult(response.data); // Set the result from the API response
      setIsAnalyzed(true); // Mark the analysis as done
    } catch (error) {
      console.error("Error fetching analysis:", error);
      let errorMessage = "Failed to fetch analysis"; // Default error message
      if (error.response && error.response.data && error.response.data.error) {
        // If the backend provides a specific error message, use it
        errorMessage = error.response.data.error;
      }
      setAnalysisResult({ error: errorMessage });
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
        <TouchableOpacity
          style={styles.button}
          onPress={fetchAnalysis}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Analyze Preloaded Text</Text>
          )}
        </TouchableOpacity>
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
    backgroundColor: "#E8F9FD",
  },
  button: {
    backgroundColor: "#FFA07A",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50, // Ensure the button has a fixed height for the loader
    width: 250, // Standard width for better aesthetics
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
});

export default FinalAnalysis;
