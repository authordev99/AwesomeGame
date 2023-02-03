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
  Text,
} from "react-native";

import CategoryItem from "./components/CategoryItem";
import { useNavigation } from "@react-navigation/native";
import { gameData } from "./data";
import SpaceFiller from "./components/SpaceFiller";
import CustomButton from "./components/CustomButton";


function Home() {
  const navigation = useNavigation();
  const [data, setData] = useState(gameData);


  const onPressCategory = (itemSelected) => {
    const updatedData = data.map((item) => {
      item.isSelected = item.id === itemSelected.id;
      return item;
    });
    setData(updatedData);
  };

  const onPressStartButton = () => {
    const selectedCategory = data.find((item) => item.isSelected);
    if (!selectedCategory) {
      Alert.alert("Please select one category above");
      return;
    }
    console.log(selectedCategory);

    navigation.navigate("Username", {
      category: selectedCategory,
    });
  };

  const onPressLeaderboardsButton = () => {
    navigation.navigate("Leaderboards");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Words Puzzle</Text>
      {data?.map((data, index) => {
        return <CategoryItem key={index} data={data} onPress={onPressCategory} />;
      })}
      <SpaceFiller height={24} />
      <CustomButton text={"Enter"} onPress={onPressStartButton} />
      <SpaceFiller height={16} />
      <CustomButton text={"Leaderboards"} onPress={onPressLeaderboardsButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#efeff3",
  },
  title: {
    fontWeight: "700",
    alignSelf: "center",
    fontSize: 24,
  },

});

export default Home;
