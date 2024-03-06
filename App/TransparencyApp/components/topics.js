import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import Fonts from "../assets/fonts";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

function Topics(props) {
  const navigation = useNavigation(); // Use the navigation hook

  useEffect(() => {
    if (props.buttonList.length == 0) {
      fetchToparticles();
    }
  }, []);

  const fetchToparticles = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/getTopics", {});
      props.changeList(response.data);
    } catch (error) {
    } finally {
    }
  };

  let clickFunction = (item) => {
    fetchAnalysis(item.url);
  };

  const fetchAnalysis = async (url) => {
    props.setIsLoading(true);
    let dictionary = {
      articleTopic: "",
      newsSource: "",
      input_type: "url",
      url: url,
    };
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        data: dictionary,
      });
      props.setAnalysisResult(response.data);

      navigation.navigate("FinalAnalysis", { analysisResult: response.data });
    } catch (error) {
      props.setAnalysisResult({ error: "Failed to fetch analysis" });
      props.displayError();
    } finally {
      props.setIsLoading(false);
    }
  };

  return (
    <View style={styles.scaleContainer}>
      <Text style={styles.topics}>Popular Topics</Text>
      <View style={styles.ScrollView}>
        <ScrollView>
          {props.buttonList.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 10,
              }}
            >
              <Pressable
                style={styles.buttonContainer}
                onPress={() => clickFunction(item)}
              >
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scaleContainer: {
    width: "100%",
    paddingTop: "6%",
    height: "100%",
    paddingHorizontal: "6%",
  },

  topics: {
    ...Fonts.subtitle,
    fontSize: 18,
    textAlign: "center",
  },

  buttonContainer: {
    paddingHorizontal: 25,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },

  title: {
    ...Fonts.subtitle,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Topics;
