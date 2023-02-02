/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import {
  FlatList, Image,
  SafeAreaView,
  StyleSheet,
  Text, TouchableOpacity, View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import SpaceFiller from "../components/SpaceFiller";


function Leaderboards({ route, navigation }) {
  const [data, setData] = useState([]);
  const insets = useSafeAreaInsets();
  // const getData = AsyncStorage.getItem("leaderboards");
  // const data = [{id: 1,name: "Rico",score: 700}, {id: 2, name: "Ricky",score: 100}, {id: 3,name: "Thohir",score: 300}]
  // const filteredData = data.sort((a, b) => {
  //   return b.score - a.score;
  // });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const leaderboards = await AsyncStorage.getItem("leaderboards");
    console.log("leaderboardList = ", leaderboards);
    const leaderboardList = JSON.parse(leaderboards);
    const filteredData = leaderboardList?.sort((a, b) => {
      return b.finalScore - a.finalScore;
    });

    setData([...filteredData]);
    console.log("data = ", data);

  };
  const renderItem = ({ item, index }) => (
    <View style={{
      flexDirection: "row",
      flex: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      marginHorizontal: 16,
      marginVertical: 8,
    }}>
      <Text>{index + 1}</Text>
      <SpaceFiller width={16} />
      <View style={{
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        backgroundColor: "#B2BEB5",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>{item?.username.charAt(0)}</Text>
      </View>
      <SpaceFiller width={24} />
      <Text style={{ flex: 1 }}>{item?.username}</Text>
      <View style={{backgroundColor: '#5DBC7D', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16}}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{item?.finalScore}</Text>
      </View>
    </View>
  );

  function keyExtractor(item, index) {
    return `${item.user}-${index}`;
  }

  return (
    <View style={{ justifyContent: "center", flex: 1, backgroundColor: "#efeff3" }}>
      <Header headerLeftElement={
        <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => navigation.goBack()}>
          <Image source={require("../images/back.png")} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      } headerCenterElement={<Text style={{ textAlign: "center" }}>Leaderboards</Text>} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} />
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

export default Leaderboards;
