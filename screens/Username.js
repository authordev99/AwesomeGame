/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import {
  Alert,
  FlatList, Image,
  SafeAreaView,
  StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from "react-native";
import Header from "../components/Header";


function Username({ route, navigation }) {
  const { category } = route.params;
  const [username, setUsername] = useState("");

  const onPress = () => {
    if (!username)
    {
      Alert.alert("Please enter your name")
      return;
    }
    navigation.replace("Game", {
      category: category,
      username: username,
    });
  };

  const onChangeText = (value) => {
    console.log("value = ", value);
    setUsername(value);
  };
  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <Header headerLeftElement={
        <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => navigation.goBack()}>
          <Image source={require("../images/back.png")} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      }/>
      <View style={{ flex: 1, padding: 16 }}>
        <TextInput
          style={{borderRadius: 1,
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
            height: 100,
            marginTop: 5,
            width: "80%",}}
          textAlign="left"
          autoCorrect={false}
          autoFocus={false}
          allowFontScaling={false}
          numberOfLines={1}
          placeholder={"My name is"}
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={{backgroundColor: '#5DBC7D', borderRadius: 36, marginHorizontal: 0, alignItems: 'center', padding: 16}} onPress={onPress}>
          <Text style={{textTransform:'uppercase', fontWeight: 'bold', color: 'white'}}>Let's Go</Text>
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

export default Username;
