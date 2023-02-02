/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from "react-native";

import CategoryItem from "./components/CategoryItem";
import { useNavigation } from "@react-navigation/native";
import { gameData } from "./data";


function Home() {
  const navigation = useNavigation();
  const [data, setData] = useState(gameData);


  const onPressCategory = (itemSelected) => {
    const updatedData = data.map((item)=>{
      item.isSelected = item.id === itemSelected.id
      return item
    })
    setData(updatedData)
  }

  const onPressStartButton = () => {
    const selectedCategory = data.find((item) => item.isSelected )
    console.log(selectedCategory)

    navigation.navigate("Username", {
      category: selectedCategory
    });
  }

  const onPressLeaderboardsButton = () => {
    navigation.navigate("Leaderboards");
  }

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1,}}>

      <Text style={styles.title}>Words Puzzle</Text>
      {data?.map((data, index)=>{
        return  <CategoryItem key={index} data={data} onPress={onPressCategory}/>;
      })}
      <TouchableOpacity style={{borderWidth: 1, borderRadius: 8, margin: 48, alignItems: 'center', padding: 16}} onPress={onPressStartButton}>
        <Text style={{textTransform:'uppercase'}}>start</Text>
      </TouchableOpacity>




      <TouchableOpacity style={{borderWidth: 1, borderRadius: 8, marginHorizontal: 48, alignItems: 'center', padding: 16}} onPress={onPressLeaderboardsButton}>
        <Text style={{textTransform:'uppercase'}}>Leaderboards</Text>
      </TouchableOpacity>

      {/*<View style={{*/}
      {/*  backgroundColor: '#ffffff',*/}
      {/*  borderWidth: 1,*/}
      {/*  borderRadius: 8,*/}
      {/*  justifyContent: 'center',*/}
      {/*  alignItems: 'center',*/}
      {/*  ...StyleSheet.absoluteFill,*/}
      {/*}}>*/}
      {/*  <TextInput style={{paddingVertical: 16}} placeholder={"username"}/>*/}
      {/*  <TouchableOpacity onPress={onPressLeaderboardsButton}>*/}
      {/*    <Text style={{textTransform:'uppercase'}}>ENTER</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
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

export default Home;
