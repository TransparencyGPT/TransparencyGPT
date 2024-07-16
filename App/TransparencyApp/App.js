import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./Screens/HomeScreen";
import TopicsScreen from "./Screens/TopicsScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import FinalAnalysis from "./Screens/AnalysisScreen";
import SearchScreen from "./Screens/SearchScreen";
import NewsSourceScreen from "./Screens/NewsSourceScreen";
import NewsSource from "./NewsSources/NewsSource";
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
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="NYTAnalysis" component={NewsSource} />
      <Stack.Screen name="CNNAnalysis" component={NewsSource} />
      <Stack.Screen name="BBCAnalysis" component={NewsSource} />
      <Stack.Screen name="FoxAnalysis" component={NewsSource} />
      <Stack.Screen name="NBCAnalysis" component={NewsSource} />
      <Stack.Screen name="WSJAnalysis" component={NewsSource} />
      <Stack.Screen name="WPAnalysis" component={NewsSource} />
      <Stack.Screen name="USATodayAnalysis" component={NewsSource} />
      <Stack.Screen name="Topics" component={TopicsScreen} />
      <Stack.Screen name="NewsSource" component={NewsSourceScreen} />
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
          Cutive: require("./assets/Fonts/Cutive-Regular.ttf"),
          Special: require("./assets/Fonts/SpecialElite-Regular.ttf"),
          Cutive_Mono: require("./assets/Fonts/CutiveMono-Regular.ttf"),
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
