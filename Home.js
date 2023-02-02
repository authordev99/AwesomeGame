/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from "react-native";

import CategoryItem from "./components/CategoryItem";
import { useNavigation } from "@react-navigation/native";
import { gameData } from "./data";
import SpaceFiller from "./components/SpaceFiller";


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
    if (!selectedCategory)
    {
      Alert.alert("Please select one category above")
      return;
    }
    console.log(selectedCategory)

    navigation.navigate("Username", {
      category: selectedCategory
    });
  }

  const onPressLeaderboardsButton = () => {
    navigation.navigate("Leaderboards");
  }

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1, backgroundColor: '#efeff3'}}>

      <Text style={styles.title}>Words Puzzle</Text>
      {data?.map((data, index)=>{
        return  <CategoryItem key={index} data={data} onPress={onPressCategory}/>;
      })}
      <SpaceFiller height={24} />
      <TouchableOpacity style={{backgroundColor: '#5DBC7D', borderRadius: 36, marginHorizontal: 48, alignItems: 'center', padding: 16}} onPress={onPressStartButton}>
        <Text style={{textTransform:'uppercase', fontWeight: 'bold', color: 'white'}}>Enter</Text>
      </TouchableOpacity>
      <SpaceFiller height={16} />
      <TouchableOpacity style={{backgroundColor: '#5DBC7D', borderRadius: 36, marginHorizontal: 48, alignItems: 'center', padding: 16}} onPress={onPressLeaderboardsButton}>
        <Text style={{textTransform:'uppercase', fontWeight: 'bold', color: 'white'}}>Leaderboards</Text>
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

export default Home;
