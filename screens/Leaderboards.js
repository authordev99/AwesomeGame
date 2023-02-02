/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text, View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Leaderboards({route, navigation}) {
  const [data, setData] = useState([]);
  // const getData = AsyncStorage.getItem("leaderboards");
  // const data = [{id: 1,name: "Rico",score: 700}, {id: 2, name: "Ricky",score: 100}, {id: 3,name: "Thohir",score: 300}]
  // const filteredData = data.sort((a, b) => {
  //   return b.score - a.score;
  // });

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    const leaderboards = await AsyncStorage.getItem("leaderboards");
    console.log("leaderboardList = ",leaderboards)
    const leaderboardList = JSON.parse(leaderboards)
    const filteredData = leaderboardList?.sort((a, b) => {
      return b.finalScore - a.finalScore;
    });

    setData([...filteredData])
    console.log("data = ",data)

  }
  const renderItem = ({ item, index }) => (
    <View style={{flexDirection: 'row', flex: 1, padding: 24, borderBottomWidth: 1, justifyContent: 'space-between'}}>
      <Text>{index + 1}</Text>
      <Text>{item?.username}</Text>
      <Text>{item?.finalScore}</Text>
    </View>
  );

  function keyExtractor(item, index) {
    return `${item.user}-${index}`;
  }

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1, backgroundColor: '#ffffff'}}>
      <FlatList
        data={data}
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
