import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SpaceFiller from "./SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EarnScore = ({ isAnswerCorrect, score }) => {
  const image = isAnswerCorrect ? require("../images/congratulation.png") : require("../images/try.png");
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <SpaceFiller height={16} />
      <Text style={styles.text}>{`You earn ${score} point`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  text: { color: "white", fontSize: 24, fontWeight: "bold" },
  image: { width: 100, height: 100 },
});


export default EarnScore;
