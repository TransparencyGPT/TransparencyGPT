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
  Image,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import SlidingRow from "./slidingRow";
import Shadows from "../assets/shadow";
import Fonts from "../assets/fonts";
import Colors from "../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import items from "../NewsSources/newsSourceArray";

function InputInterface(props) {
  let [pasted, setPasted] = useState(false);
  const handleURLChange = (text) => {
    props.changeURL(text);
    // If the text is empty, reset the isPasted state to false
    if (text === "") {
      setPasted(false);
    }
  };

  const pasteURL = async () => {
    const text = await Clipboard.getStringAsync();
    props.changeURL(text);
    if (text) {
      setPasted(true); // Set the isPasted state to true only if text is not empty
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!props.searchURL && (
        <>
          <TextInput
            style={styles.input}
            onChangeText={props.changeArticle}
            value={props.articleTopic}
            placeholder="🔎 Article Title..."
          />
          <TextInput
            style={styles.input}
            onChangeText={props.changeNews}
            value={props.newsSource}
            placeholder="🔎 News Source..."
          />
        </>
      )}
      {props.searchURL && (
        <>
          <TextInput
            style={styles.input}
            onChangeText={handleURLChange}
            value={props.url}
            placeholder="🔎 URL..."
          />
          <Pressable style={styles.buttonContainer} onPress={pasteURL}>
            {pasted && (
              <View style={styles.clipboard}>
                <FontAwesome5 name="paste" size={24} color="black" />
                <AntDesign name="check" size={24} color="black" />
              </View>
            )}
            {!pasted && (
              <View style={styles.clipboard}>
                <FontAwesome name="paste" size={24} color="black" />
              </View>
            )}
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    paddingBottom: 8,
    width: "100%",
    fontSize: 16,
    color: "#333",
    ...Fonts.loading,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...Shadows.basicShadow,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    ...Fonts.subtitle,
  },
  clipboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Shadows.basicShadow,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default InputInterface;
