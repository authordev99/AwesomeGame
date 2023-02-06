import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { EMERALD } from "../util/colors";

const CustomButton = ({ text, onPress, additionalStyles }) => {
  return (
    <TouchableOpacity style={[styles.container, additionalStyles]} onPress={onPress}>
      <Text style={styles.title}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: EMERALD,
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
