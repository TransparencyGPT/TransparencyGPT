import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./Home";
import NYTAnalysisScreen from "./NewsSources/NYTAnalysis";
import CNNAnalysisScreen from "./NewsSources/CNNAnalysis";
import BBCAnalysisScreen from "./NewsSources/BBCAnalysis";
import FoxAnalysisScreen from "./NewsSources/FoxAnalysis";
import NBCAnalysisScreen from "./NewsSources/NBCAnalysis";
import WSJAnalysisScreen from "./NewsSources/WSJAnalysis";
import WPAnalysisScreen from "./NewsSources/WPAnalysis";
import USATodayAnalysisScreen from "./NewsSources/USATodayAnalysis";
import LoadingScreen from "./loading";
import FinalAnalysis from "./analysis";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // This will hide the header globally
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NYTAnalysis" component={NYTAnalysisScreen} />
      <Stack.Screen name="CNNAnalysis" component={CNNAnalysisScreen} />
      <Stack.Screen name="BBCAnalysis" component={BBCAnalysisScreen} />
      <Stack.Screen name="FoxAnalysis" component={FoxAnalysisScreen} />
      <Stack.Screen name="NBCAnalysis" component={NBCAnalysisScreen} />
      <Stack.Screen name="WSJAnalysis" component={WSJAnalysisScreen} />
      <Stack.Screen name="WPAnalysis" component={WPAnalysisScreen} />
      <Stack.Screen
        name="USATodayAnalysis"
        component={USATodayAnalysisScreen}
      />

      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="FinalAnalysis" component={FinalAnalysis} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Cutive: require("./assets/Cutive-Regular.ttf"),
          Special: require("./assets/SpecialElite-Regular.ttf"),
        });
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
