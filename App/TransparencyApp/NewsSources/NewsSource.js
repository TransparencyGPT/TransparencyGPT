import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import SliderScore from "../components/sliderScore";
import Shadows from "../assets/shadow";
import Fonts from "../assets/fonts";
import jsonData from "./newsText.json";

function NewsSource({ navigation, route }) {
  const title = route.params.item;
  const id = route.params.id;

  let backButton = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.analysisHead}>Analysis of</Text>
          <Text style={styles.analysisHead}>{title}</Text>
        </View>
        <View style={styles.middleView}>
          <ScrollView style={styles.scroll}>
            <View style={styles.innerMiddleView}>
              <View style={styles.sectionView}>
                <Text style={styles.subsection}>{jsonData[String(id)]}</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.buttomView}>
          <Pressable style={styles.buttonContainer} onPress={backButton}>
            <Text style={styles.buttonText}>BACK</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  container: {
    borderRadius: 12,
    backgroundColor: "white",
    height: "93%",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  containerEmpty: {
    borderRadius: 12,
    height: "93%",
    padding: 14,
    width: "93%",
  },

  titleView: { flex: 1.03, alignItems: "center", marginBottom: 30 },

  middleView: { flex: 8 },

  scroll: {},
  innerMiddleView: { width: "93%" },

  buttomView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

  analysisHead: {
    fontSize: 22,
    color: "black",
    fontWeight: "bold",
    marginTop: 4,
    ...Fonts.title,
  },

  sectionView: {
    marginBottom: 12,
  },

  subsection: {
    fontWeight: "700",
    ...Fonts.loading,
    fontSize: 15,
  },

  content: {
    ...Fonts.loadingFact,
    fontSize: 11,
    fontWeight: "400",
  },

  scaleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "100%",
  },
});

export default NewsSource;
