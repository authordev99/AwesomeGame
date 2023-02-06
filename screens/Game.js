/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text, TouchableOpacity, View,
} from "react-native";

import { shuffle } from "../util/utility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import SpaceFiller from "../components/SpaceFiller";
import CustomButton from "../components/CustomButton";
import CustomImageButton from "../components/CustomImageButton";
import CustomText from "../components/CustomTitle";
import EarnScore from "../components/EarnScore";
import { ContextState } from "../context";
import { getLeaderboardList, setCurrentUser, setLeaderboardList, updateUserList } from "../util/utility";
import { EMERALD, FLASHWHITE, JELLYBEAN, TUFTSBLUE } from "../util/colors";
import { OPTION, SKIP } from "../util/strings";

const backgroundHeight = 380;

function Game({ route, navigation }) {
  const state = useContext(ContextState);
  const { category } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [optionList, setOptionList] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isShowScore, setShowScore] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [result, setResult] = useState({
    skip: 0,
    correct: 0,
    wrong: 0,
  });

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


  const onPressAnswerCharacter = (character, index) => {
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
    if (answer?.length > currentAnswerLength) {
      //Set answer
      const index = currentAnswerLength ?? currentAnswerLength + 1;
      currentAnswer[index] = character;
      setCurrentAnswer([...currentAnswer]);
    }
  };

  const onPressButton = async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem("@user"));
    const selectedAnswer = getSelectedAnswer();
    const point = category.questions[currentIndex].point;
    const nextIndex = currentIndex + 1;
    let updatedScore = score;
    let updateResult = {};

    if (isShowScore) {
      setShowScore(false);
      goToNext(nextIndex);
    } else {
      if (selectedAnswer?.length === answer?.length) {
        if (selectedAnswer === answer) {
          updateResult = { correct: result.correct + 1 };
          updatedScore += point;
          setScore(updatedScore);
          setShowScore(true);
          setIsAnswerCorrect(true);
        } else {
          updateResult = { wrong: result.wrong + 1 };
          setIsAnswerCorrect(false);
          setShowScore(true);
        }
      } else {
        updateResult = { skip: result.skip + 1 };
        goToNext(nextIndex);
      }

      const finalResult = { ...result, ...updateResult };
      const updatedUser = { ...currentUser, score: updatedScore };
      setResult(finalResult);
      if (nextIndex === category.questions.length) {
        const summary = {
          user: updatedUser,
          finalScore: updatedScore,
          totalQuestion: category.questions.length,
          data: category,
          ...finalResult,
          date: new Date(),
        };
        const leaderboardList = await getLeaderboardList() ?? [];
        const isUserExist = leaderboardList?.findIndex((item) => item.user.username === updatedUser.username);
        if (isUserExist >= 0) {
          leaderboardList[isUserExist] = summary;
        } else {
          leaderboardList?.push(summary);
        }

        await updateUser(updatedUser);
        await setLeaderboardList(leaderboardList);

        navigation.replace("Result", { data: summary });
      }
    }
  };

  const updateUser = async (user) => {
    await updateUserList(user);
    await setCurrentUser(user);
    state.setUser(user);
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
    return selectedAnswer?.length === answer?.length ? { title: "NEXT", color: EMERALD } : {
      title: SKIP,
      color: JELLYBEAN,
    };
  };

  const getSelectedAnswer = () => {
    return currentAnswer?.map((item) => {
      return item.value ?? "";
    }).join("");
  };

  const goBack = () => {
    navigation.goBack();
  };

  const QuestionSection = () => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Question : </Text>
        <Text style={styles.questionGameText}>{category?.questions[currentIndex].question}</Text>
      </View>
    );
  };

  const AnswerBoxes = ({ answerList, onPressItem }) => {
    return (
      <View style={styles.answerBoxesContainer}>
        {answerList?.map((char, index) => {
          return <TouchableOpacity
            key={index}
            style={styles.answerBoxContainer}
            onPress={() => onPressItem(char, index)}>
            <Text style={styles.answerText}>{char?.value}</Text>
          </TouchableOpacity>;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.customBackground} />
      <Header
        headerLeftElement={<Text style={styles.textBold}>{`${currentIndex + 1}/${category.questions.length}`}</Text>}
        headerRightElement={<CustomImageButton image={require("../images/close.png")} onPress={goBack} />}
        headerCenterElement={<CustomText text={category.category} />}
      />
      <View style={styles.contentContainer}>
        {!isShowScore ? (
          <>
            <QuestionSection />
            <SpaceFiller height={24} />
            <AnswerBoxes answerList={currentAnswer} onPressItem={onPressAnswerCharacter} />
            <SpaceFiller height={backgroundHeight / 3} />
            <Text style={styles.optionText}>{OPTION} </Text>
            <AnswerBoxes answerList={optionList} onPressItem={onPressOptionCharacter} />
          </>
        ) : (
          <EarnScore isAnswerCorrect={isAnswerCorrect} score={isAnswerCorrect ? category.questions[currentIndex].point : 0} />
        )}
        <SpaceFiller height={24} />
        <CustomButton
          text={getButtonStyle().title}
          additionalStyles={{ backgroundColor: getButtonStyle().color }}
          onPress={onPressButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: FLASHWHITE,
  },
  customBackground: {
    backgroundColor: TUFTSBLUE,
    height: backgroundHeight,
    ...StyleSheet.absoluteFill,
  },
  textBold: { color: "white", fontWeight: "bold" },
  contentContainer: { flex: 1, margin: 16 },
  title: {
    fontWeight: "700",
    alignSelf: "center",
    fontSize: 24,
  },
  closeButton: { width: 24, height: 24, tintColor: "white" },
  answerBoxesContainer: { flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" },
  answerBoxContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  answerText: { fontWeight: "bold", fontSize: 20 },
  optionText: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 16,
  },
  questionText: { color: "white", fontSize: 16 },
  questionContainer: { marginHorizontal: 16 },
  questionGameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Game;
