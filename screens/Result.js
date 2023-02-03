/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  Image,
  StyleSheet,
  Text, TouchableOpacity, View,
} from "react-native";
import Header from "../components/Header";
import SpaceFiller from "../components/SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";


function Result({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { data, isFromLeaderboards } = route.params;
  const image = data.correct === data.totalQuestion ? require("../images/congratulation.png") : require("../images/goodJob.png");

  const onPress = () => {
    navigation.replace("Leaderboards");
  };

  return (
    <View style={styles.container}>
      <Header
        headerRightElement={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../images/close.png")} style={styles.icon} />
          </TouchableOpacity>
        } />
      <View style={styles.contentContainer}>
        <Image source={image} style={styles.image} />
        <SpaceFiller height={24} />
        <Text style={styles.text}>{data.username}</Text>
        <Text style={styles.text}>Your total score is {data.finalScore}</Text>
        <SpaceFiller height={24} />
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>summary :</Text>
          <Text style={[styles.text, { fontSize: 16 }]}>{`Total Questions : ${data.totalQuestion}`}</Text>
          <Text style={[styles.text, { fontSize: 16 }]}>{`Total Correct Answer : ${data.correct}`}</Text>
          <Text style={[styles.text, { fontSize: 16 }]}>{`Total Wrong Answer : ${data.wrong}`}</Text>
          <Text style={[styles.text, { fontSize: 16 }]}>{`Total Skip : ${data.skip}`}</Text>
        </View>
      </View>
      {!isFromLeaderboards && <CustomButton text={"Leaderboards"} onPress={onPress} additionalStyles={{ marginBottom: insets.bottom }}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#4a90e2",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    width: 150,
    height: 150
  },
  title: {
    fontWeight: "700",
    alignSelf: "center",
    fontSize: 24,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24 },
  summaryContainer: {
    alignSelf: "center",
    padding: 16
  },
  summaryText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    textTransform: "uppercase",
    marginVertical: 16,
  },
});

export default Result;
