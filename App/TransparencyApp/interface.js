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
import * as Clipboard from "expo-clipboard";

function InputInterface(props) {
  const pasteURL = async () => {
    const text = await Clipboard.getStringAsync();
    props.changeURL(text);
  };

  return (
    <View style={styles.container}>
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
            onChangeText={props.changeURL}
            value={props.url}
            placeholder="🔎 URL..."
          />
          <Pressable style={styles.buttonContainer} onPress={pasteURL}>
            <Text style={styles.buttonText}>PASTE</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    backgroundColor: "white",
    width: "90%",
  },
  buttonContainer: {
    height: 40,
    backgroundColor: "white",
    width: 90,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
  },
});

export default InputInterface;
