/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text, TouchableOpacity, View,
} from "react-native";

import { shuffle } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import SpaceFiller from "../components/SpaceFiller";


function Game({ route, navigation }) {

  const { category, username } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [optionList, setOptionList] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isShowScore, setShowScore] = useState(false);
  const [result, setResult] = useState({
    skip: 0,
    correct: 0,
    wrong: 0,
  });
  const backgroundHeight = 380;

  useEffect(() => {
    const questions = category.questions[currentIndex];
    const answer = questions.answer.toUpperCase();
    const answerBoxInput = Array.from(answer).fill("");
    const answerRandomList = Array.from(shuffle(answer)).map((item, index) => {
      return { value: item, indexOption: index };
    });

    setOptionList(answerRandomList);
    setCurrentAnswer(answerBoxInput);
    setAnswer(answer);

  }, [currentIndex]);


  const onPressCharacter = (character, index) => {
    if (character) {
      //set character back to original position in option row
      optionList[character.indexOption] = character;
      setOptionList([...optionList]);
    }
    //make empty character in answer row
    currentAnswer[index] = "";
    setCurrentAnswer([...currentAnswer]);
  };

  const onPressOptionCharacter = (character, index) => {
    //Make option character empty
    optionList[index] = "";
    setOptionList([...optionList]);

    const currentAnswerLength = getCurrentEmptyIndex();
    console.log("answer = ", answer);
    if (answer?.length > currentAnswerLength) {
      //Set answer
      const index = currentAnswerLength ?? currentAnswerLength + 1;
      currentAnswer[index] = character;
      setCurrentAnswer([...currentAnswer]);
    }
  };

  const onPressButton = async () => {
    const selectedAnswer = getSelectedAnswer();
    const nextIndex = currentIndex + 1;
    let updatedScore = score;
    let updateResult = {};


    if (isShowScore) {
      setShowScore(false);
      goToNext(nextIndex);


    } else {
      if (selectedAnswer?.length === answer?.length) {
        if (selectedAnswer === answer) {
          console.warn("selectedValue = ", "BETUL");
          updateResult = { correct: result.correct + 1 };
          updatedScore += 100;
          setScore(updatedScore);
          setShowScore(true);
        } else {
          console.warn("selectedValue = ", "SALAH");
          updateResult = { wrong: result.wrong + 1 };
          goToNext(nextIndex);
        }
      } else {
        console.warn("SKIP = ", result);
        updateResult = { skip: result.skip + 1 };
        goToNext(nextIndex);
      }
      console.log(currentIndex + " " + category.questions.length);

      const finalResult = { ...result, ...updateResult };
      setResult(finalResult);
      if (nextIndex === category.questions.length) {
        const summary = {
          username: username,
          finalScore: updatedScore,
          totalQuestion: category.questions.length,
          category: category.name,
          ...finalResult,
        };
        const leaderboardList = JSON.parse(await AsyncStorage.getItem("leaderboards")) ?? [];
        console.log("leaderboardList = ", leaderboardList);
        leaderboardList?.push(summary);
        console.log("updatedLeaderboardList = ", leaderboardList);
        AsyncStorage.setItem("leaderboards", JSON.stringify(leaderboardList)).then(() => {
          navigation.replace("Result", { data: summary });
        });
      }
    }
  };

  const goToNext = (nextIndex) => {
    if (nextIndex < category.questions.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const getCurrentEmptyIndex = () => {
    return currentAnswer.findIndex((item, index) => {
      return !item;
    });
  };

  const getButtonStyle = () => {
    const selectedAnswer = getSelectedAnswer();
    return selectedAnswer?.length === answer?.length ? { title: "NEXT", color: "#5DBC7D" } : {
      title: "SKIP",
      color: "#e35d5d",
    };
  };

  const getSelectedAnswer = () => {
    return currentAnswer?.map((item) => {
      return item.value ?? "";
    }).join("");
  };

  return (
    <View style={{ justifyContent: "center", flex: 1, backgroundColor: "#efeff3" }}>
      <View style={{ backgroundColor: "#4a90e2", height: backgroundHeight, ...StyleSheet.absoluteFill }} />
      <Header headerLeftElement={<Text
        style={{ color: "white", fontWeight: "bold" }}>{`${currentIndex + 1}/${category.questions.length}`}</Text>}
              headerRightElement={
                <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => navigation.goBack()}>
                  <Image source={require("../images/close.png")}
                         style={{ width: 24, height: 24, tintColor: "white" }} />
                </TouchableOpacity>
              }
              headerCenterElement={<Text
                style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>{category.category}</Text>} />
      <View style={{ flex: 1, margin: 16 }}>
        {!isShowScore ? <>
            <View style={{ marginHorizontal: 16 }}>
              <Text style={{ color: "white", fontSize: 16 }}>Question : </Text>
              <Text style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}>{category?.questions[currentIndex].question}</Text>
            </View>
            <SpaceFiller height={24} />
            <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
              {currentAnswer?.map((char, index) => {
                return <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    marginTop: 16,
                    marginHorizontal: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                  onPress={() => onPressCharacter(char, index)}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>{char?.value}</Text>
                </TouchableOpacity>;
              })}
            </View>
            <SpaceFiller height={backgroundHeight / 3} />
            <View style={{ marginHorizontal: 16 }}>
              <Text style={{
                fontWeight: "bold",
                fontSize: 20,
              }}>Option : </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
              {optionList?.map((item, index) => {
                return <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    marginTop: 16,
                    marginHorizontal: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                  onPress={() => onPressOptionCharacter(item, index)}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item?.value}</Text>
                </TouchableOpacity>;
              })}
            </View>
          </> :
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../images/congratulation.png')} style={{width: 100, height: 100}}/>
            <SpaceFiller height={16} />
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>{`You earn ${score} point`}</Text>
          </View>
        }
        <SpaceFiller height={24} />
        <TouchableOpacity style={{
          backgroundColor: getButtonStyle().color,
          borderRadius: 36,
          marginHorizontal: 48,
          alignItems: "center",
          padding: 16,
        }} onPress={onPressButton}>
          <Text
            style={{ textTransform: "uppercase", fontWeight: "bold", color: "white" }}>{getButtonStyle().title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  title: {
    fontWeight: "700",
    alignSelf: "center",
    fontSize: 24,
  },
});

export default Game;
