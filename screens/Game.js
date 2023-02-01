/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text, TouchableOpacity, View,
} from "react-native";

import { shuffle } from "../utils";


function Game({route, navigation}) {

  const { category } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [optionList, setOptionList] = useState(null)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [isShowScore, setShowScore] = useState(false);

  useEffect(()=>{
    const questions = category.questions[currentIndex];
    const answer = questions.answer.toUpperCase();
    const answerBoxInput = Array.from(answer).fill("");
    const answerRandomList = Array.from(shuffle(answer)).map((item, index)=>{
      return {value: item, indexOption: index};
    });

    setOptionList(answerRandomList)
    setCurrentAnswer(answerBoxInput)
    setAnswer(answer)

  },[currentIndex])



  const onPressCharacter = (character, index) => {
    if (character)
    {
      //set character back to original position in option row
      optionList[character.indexOption] = character;
      setOptionList([...optionList]);
    }
    //make empty character in answer row
    currentAnswer[index] = "";
    setCurrentAnswer([...currentAnswer]);
  }

  const onPressOptionCharacter = (character, index) => {
    //Make option character empty
    optionList[index] = "";
    setOptionList([...optionList]);

    const currentAnswerLength = getCurrentEmptyIndex();
    console.log("answer = ",answer)
    if (answer?.length > currentAnswerLength)
    {
      //Set answer
      const index = currentAnswerLength ?? currentAnswerLength + 1
      currentAnswer[index] = character;
      setCurrentAnswer([...currentAnswer]);
    }
  }

  const onPressButton = () => {
    const selectedAnswer = getSelectedAnswer();
    if (isShowScore)
    {
      setShowScore(false);
      const nextIndex = currentIndex + 1;
      if (nextIndex < category.questions.length)
      {
        setCurrentIndex(nextIndex)
      }else{

      }
    } else {
      if (selectedAnswer?.length === answer?.length)
      {
        if (selectedAnswer === answer){
          console.warn("selectedValue = ","BETUL")
          setScore(score + 100)
          setShowScore(true);
        } else {
          console.warn("selectedValue = ","SALAH")
        }
      } else {
        console.warn("SKIP")
      }
    }



  }

  const onPressNextScore = () =>{

  }

  const getCurrentEmptyIndex = () => {
    return currentAnswer.findIndex((item, index)=>{
      return !item
    })
  }

  const getButtonText = () => {
    const selectedAnswer = getSelectedAnswer();
    return selectedAnswer?.length === answer?.length ? "NEXT" : "SKIP";
  }

  const getSelectedAnswer = () => {
    return currentAnswer?.map((item) =>{
      return item.value ?? ""
    }).join("");
  }

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1, margin: 16}}>
      <Text>{`${currentIndex+1}/${category.questions.length}`}</Text>
      {!isShowScore ? <>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {currentAnswer?.map((char, index)=> {
            return <TouchableOpacity
              style={{borderWidth: 1, width: 40, height: 40, borderRadius: 8, marginTop: 16, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => onPressCharacter(char,index)}>
              <Text>{char?.value}</Text>
            </TouchableOpacity>
          })}
        </View>
        <View style={{marginVertical: 24, marginHorizontal: 16}}>
          <Text>Question : </Text>
          <Text>{category?.questions[currentIndex].question}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {optionList?.map((item, index)=> {
            return <TouchableOpacity
              style={{borderWidth: 1, width: 40, height: 40, borderRadius: 8, marginTop: 16, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => onPressOptionCharacter(item,index)}>
              <Text>{item?.value}</Text>
            </TouchableOpacity>
          })}
        </View>
      </> : <Text>{score}</Text>}
      <TouchableOpacity style={{borderWidth: 1, borderRadius: 8, margin: 48, alignItems: 'center', padding: 16}} onPress={onPressButton}>
        <Text style={{textTransform:'uppercase'}}>{getButtonText()}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  title: {
    fontWeight: '700',
    alignSelf: 'center',
    fontSize: 24,
  },
});

export default Game;
