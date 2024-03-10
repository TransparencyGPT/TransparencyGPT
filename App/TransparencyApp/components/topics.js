import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import Fonts from "../assets/fonts";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Shadows from "../assets/shadow";

const screenWidth = Dimensions.get("window").width;

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
    <View style={styles.ScrollView}>
      <ScrollView showsVerticalScrollIndicator={true}>
        {props.buttonList.map((item, index) => (
          <View
            key={index}
            style={{
              padding: 10,
            }}
          >
            <Pressable style={styles.card} onPress={() => clickFunction(item)}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
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
    ...Fonts.loading,
    fontSize: 15,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
  },
  card: {
    flex: 2,
    backgroundColor: "white",
    borderRadius: 10,
    ...Shadows.basicShadow,
    elevation: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 10,
  },
});

export default Topics;
