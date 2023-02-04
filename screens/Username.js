/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet, TextInput, View,
} from "react-native";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import CustomImageButton from "../components/CustomImageButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextState } from "../context";


function Username({ route, navigation }) {
  const state = useContext(ContextState);
  const [username, setUsername] = useState("");

  const onPress = async () => {
    if (!username) {
      Alert.alert("Please enter your name");
      return;
    }

    const userList = JSON.parse(await AsyncStorage.getItem("@userList")) ?? [];
    let checkUser = userList?.find((item) => {
      return item.username === username;
    });

    if (!checkUser) {
      checkUser = {
        username: username,
        score: 0,
      };
      console.log("checkUser = ",checkUser)
      userList?.push(checkUser);
      console.log("updatedUserList = ",userList)
      await AsyncStorage.setItem("@userList", JSON.stringify(userList));
    }

    AsyncStorage.setItem("@user", JSON.stringify(checkUser)).then(() => {
      state.setUser(checkUser)
      navigation.goBack();
    });
  };

  const onChangeText = (value) => {
    setUsername(value);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header headerLeftElement={
        <CustomImageButton
          image={require("../images/back.png")}
          additionalStyles={styles.icon}
          onPress={goBack} />
      } />
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.textInput}
          textAlign="left"
          autoCorrect={false}
          autoFocus={false}
          allowFontScaling={false}
          numberOfLines={1}
          placeholder={"My name is"}
          onChangeText={onChangeText}
        />
        <CustomButton text={"Login"} onPress={onPress} additionalStyles={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  icon: {
    tintColor: "black",
  },
  button: {
    marginHorizontal: 0,
  },
  textInput: {
    borderRadius: 1,
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    height: 100,
    marginTop: 5,
    width: "80%",
  },
});

export default Username;
