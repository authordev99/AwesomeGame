import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SpaceFiller from "./SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomText = ({ text }) => {
  return (
    <Text style={styles.text}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: "center", color: "white", fontWeight: "bold" }
});


export default CustomText;
