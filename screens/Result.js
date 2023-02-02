/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text, View,
} from "react-native";


function Result({route, navigation}) {
  const { data } = route.params;

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1, margin: 16}}>
      <Text>{data.user}</Text>
      <Text>{data.totalQuestion}</Text>
      <Text>{data.correct}</Text>
      <Text>{data.skip}</Text>
      <Text>{data.wrong}</Text>
      <Text>{data.finalScore}</Text>
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

export default Result;
