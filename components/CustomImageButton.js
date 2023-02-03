import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SpaceFiller from "./SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomImageButton = ({ image, onPress, additionalStyles }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={[styles.image, additionalStyles]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: { width: 24, height: 24, tintColor: "white" },
});


export default CustomImageButton;
