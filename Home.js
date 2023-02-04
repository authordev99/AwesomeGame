/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text, View,
} from "react-native";

import CategoryItem from "./components/CategoryItem";
import { useNavigation } from "@react-navigation/native";
import { gameData } from "./data";
import SpaceFiller from "./components/SpaceFiller";
import CustomButton from "./components/CustomButton";
import UserSectionItem from "./components/UserSectionItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextState } from "./context";
import { removeCurrentUser, removeLocalStorage } from "./utility";


function Home() {
  const state = useContext(ContextState);
  const navigation = useNavigation();
  const [data, setData] = useState(gameData);
  // const [user, setUser] = useState(null)

  useEffect(() => {
    getUser();
  },[])

  const getUser = async () => {
    const currentUser = await AsyncStorage.getItem("@user");
    console.log("currentUser = ",currentUser)
    state.setUser(JSON.parse(currentUser))
  }

  const onPressCategory = (itemSelected) => {
    const updatedData = data.map((item) => {
      item.isSelected = item.id === itemSelected.id;
      return item;
    });
    setData(updatedData);
  };

  const onPressStartButton = () => {
    if (!state?.user) {
      Alert.alert("Please login first");
      return;
    }

    const selectedCategory = data.find((item) => item.isSelected);
    if (!selectedCategory) {
      Alert.alert("Please select one category above");
      return;
    }

    navigation.navigate("Game", {
      category: selectedCategory,
    });
  };

  const onPressLogin = async () => {
    if (!state.user) {
      navigation.navigate("Username");
    } else {
      removeCurrentUser().then(() => {
        state.resetUser()
      });
    }

  }

  const onPressLeaderboardsButton = () => {
    navigation.navigate("Leaderboards");
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserSectionItem user={state.user} onPress={onPressLogin} />
      <SpaceFiller height={36}/>
      <Text style={styles.titleHeader}>Words Puzzle</Text>
      <SpaceFiller height={24}/>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Category : </Text>
        {data?.map((data, index) => {
          return <CategoryItem key={index} data={data} onPress={onPressCategory} />;
        })}
        <SpaceFiller height={24} />
        <CustomButton text={"Enter"} onPress={onPressStartButton} />
        <SpaceFiller height={16} />
        <CustomButton text={"Leaderboards"} onPress={onPressLeaderboardsButton} />
        {/*<SpaceFiller height={16} />*/}
        {/*<CustomButton text={"reset"} onPress={removeLocalStorage} />*/}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#efeff3",
  },
  contentContainer: { flex: 1 },
  titleHeader: {
    fontWeight: "700",
    marginHorizontal: 24,
    textAlign: 'center',
    fontSize: 24,
  },
  title: {
    fontWeight: "700",
    marginHorizontal: 24,
    fontSize: 14,
  },

});

export default Home;
