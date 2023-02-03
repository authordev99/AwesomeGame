import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SpaceFiller from "./SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomButton = ({ text, onPress, additionalStyles }) => {
  return (
    <TouchableOpacity style={[styles.container, additionalStyles]} onPress={onPress}>
      <Text style={styles.title}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5DBC7D",
    borderRadius: 36,
    marginHorizontal: 48,
    alignItems: "center",
    padding: 16,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white"
  },
});


export default CustomButton;
