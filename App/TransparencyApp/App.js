import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SubjectivityComponent from "./claude-analysis";
import FinalAnalysis from "./analysiscomponent";

export default function App() {
  return (
    <View style={styles.container}>
    
      <SubjectivityComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
