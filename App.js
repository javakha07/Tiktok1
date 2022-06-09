import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";

import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { QueryClient, QueryClientProvider } from "react-query";
import { useCallback } from "react";

import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const queryClient = new QueryClient();

  let [fontsLoaded] = useFonts({
    InterSemiBold: require("./app/assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("./app/assets/fonts/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>loading</Text>;
  }
  return (
    <KeyboardAvoidingView style={styles.avoid}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthNavigator />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avoid: {
    flex: 1,
  },
});
