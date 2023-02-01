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
  Text, TouchableOpacity
} from "react-native";

import CategoryItem from "./components/CategoryItem";
import { useNavigation } from "@react-navigation/native";


function Home() {
  const navigation = useNavigation();
  const items = [
    {name: "Cities", isSelected: false},
    {name: "Animals", isSelected: false},
    {name: "Food", isSelected: false}
  ];
  const [data, setData] = useState(items);


  const onPressCategory = (item) => {
    const updatedData = data.map((category)=>{
      category.isSelected = category.name === item.name
      return category
    })
    setData(updatedData)
  }

  const onPressStartButton = () => {
    const selectedCategory = data.find((item) => item.isSelected )
    console.log(selectedCategory)

    navigation.navigate("Game");
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
