import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import AppText from "./Text";

import colors from "../config/colors";
import { useFonts } from "expo-font";

function AppButton({ title, onPress, color = "primary", image }) {
  let [fontsLoaded] = useFonts({
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter-Medium.ttf"),
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button]} onPress={onPress}>
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
      <AppText style={[styles.text]}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 40,
    height: 40,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "InterBold",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 23,
  },
});

export default AppButton;
