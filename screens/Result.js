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
import Share from "react-native-share";
import { TUFTSBLUE } from "../util/colors";
import {
  LEADERBOARDS,
  SHARE,
  SHARE_TITLE,
  TOTAL_CORRECT_ANSWER,
  TOTAL_QUESTION,
  TOTAL_SCORE_MSG,
  TOTAL_SKIP,
  TOTAL_WRONG_ANSWER,
} from "../util/strings";


function Result({ route, navigation }) {

  const insets = useSafeAreaInsets();
  const { data, isFromLeaderboards } = route.params;
  const image = data.correct === data.totalQuestion ? require("../images/congratulation.png") : require("../images/goodJob.png");
  const summaryTextStyle = [styles.text, styles.summaryTextSize];

  const onPress = () => {
    navigation.replace("Leaderboards");
  };

  const onShare  = () => {
    const shareOptions = {
      title: SHARE_TITLE,
      failOnCancel: false,
      message: `I have done Word Puzzle Game with total score ${data.finalScore} (Correct: ${data.correct} / ${data.totalQuestion})`,
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Header
        headerRightElement={
          <TouchableOpacity onPress={goBack}>
            <Image source={require("../images/close.png")} style={styles.icon} />
          </TouchableOpacity>
        }
      />
      <View style={styles.contentContainer}>
        <Image source={image} style={styles.image} />
        <SpaceFiller height={24} />
        <Text style={styles.text}>{data.user.username}</Text>
        <Text style={styles.text}>{TOTAL_SCORE_MSG} {data.finalScore}</Text>
        <Text style={styles.dateText}>{data.date}</Text>
        <SpaceFiller height={24} />
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>summary :</Text>
          <Text style={summaryTextStyle}>{TOTAL_QUESTION} {data.totalQuestion}</Text>
          <Text style={summaryTextStyle}>{TOTAL_CORRECT_ANSWER} {data.correct}</Text>
          <Text style={summaryTextStyle}>{TOTAL_WRONG_ANSWER} {data.wrong}</Text>
          <Text style={summaryTextStyle}>{TOTAL_SKIP} {data.skip}</Text>
        </View>
      </View>
      {!isFromLeaderboards && <CustomButton text={LEADERBOARDS} onPress={onPress} additionalStyles={{ marginBottom: 16 }}/>}
      <CustomButton text={SHARE} onPress={onShare} additionalStyles={{ marginBottom: insets.bottom }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: TUFTSBLUE,
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
    fontSize: 24
  },
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
  summaryTextSize: {
    fontSize: 16,
  },
  dateText: {
    color: "white",
    fontSize: 14
  }
});

export default Result;
