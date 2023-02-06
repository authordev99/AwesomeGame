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
import { ContextState } from "../context";
import { LOGIN, USERNAME_ALERT, USERNAME_PLACEHOLDER } from "../util/strings";
import { getUserList, setCurrentUser, setUserList } from "../util/utility";


function Username({ route, navigation }) {
  const state = useContext(ContextState);
  const [username, setUsername] = useState("");

  const onPress = async () => {
    if (!username) {
      Alert.alert(USERNAME_ALERT);
      return;
    }


    const userList = await getUserList() ?? [];
    let checkUser = userList?.find((item) => {
      return item.username === username;
    });

    if (!checkUser) {
      checkUser = {
        username: username,
        score: 0,
      };
      userList?.push(checkUser);
      await setUserList(userList)
    }

    setCurrentUser(checkUser).then(() => {
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
          placeholder={USERNAME_PLACEHOLDER}
          onChangeText={onChangeText}
        />
        <CustomButton text={LOGIN} onPress={onPress} additionalStyles={styles.button} />
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
