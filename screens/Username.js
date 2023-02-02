/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from "react-native";


function Username({route, navigation}) {
  const { category } = route.params;
  const [username, setUsername] = useState("");

  const onPress = () => {
    navigation.replace("Game", {
      category: category,
      username: username,
    })
  }

  const onChangeText = (value) => {
    console.log("value = ",value)
    setUsername(value)
  }
  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1, margin: 16}}>
      <TextInput
        textAlign="left"
        autoCorrect={false}
        autoFocus={false}
        allowFontScaling={false}
        style={{}}
        numberOfLines={1}
        placeholder={"My name is"}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onPress}>
        <Text style={{textTransform:'uppercase'}}>ENTER</Text>
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

export default Username;
