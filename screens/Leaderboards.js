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


function Leaderboards({route, navigation}) {

  const data = [{id: 1,name: "Rico",score: 700}, {id: 2, name: "Ricky",score: 100}, {id: 3,name: "Thohir",score: 300}]
  const filteredData = data.sort((a, b) => {
    return b.score - a.score;
  });

  console.log("filteredData ", filteredData)

  const renderItem = ({ item, index }) => (
    <View style={{flexDirection: 'row', flex: 1}}>
      <Text>{index + 1}</Text>
      <Text>{item.name}</Text>
      <Text>{item.score}</Text>
    </View>
  );

  function keyExtractor(item, index) {
    return `${item.id}-${index}`;
  }

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1, margin: 16}}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor} />
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

export default Leaderboards;
