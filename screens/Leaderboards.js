/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import CustomImageButton from "../components/CustomImageButton";
import CustomText from "../components/CustomTitle";
import LeaderboardItem from "../components/LeaderboardItem";


function Leaderboards({ route, navigation }) {
  const [data, setData] = useState([]);

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
  const navigateToResultPage = (data) => {
    navigation.navigate("Result", { data: data, isFromLeaderboards: true });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => (
    <LeaderboardItem item={item} index={index} onPress={navigateToResultPage} />
  );

  function keyExtractor(item, index) {
    return `${item.user}-${index}`;
  }

  return (
    <View style={styles.container}>
      <Header
        headerLeftElement={
          <CustomImageButton
            image={require("../images/back.png")}
            additionalStyles={styles.icon}
            onPress={goBack} />
        }
        headerCenterElement={
          <CustomText
            text={"Leaderboards"}
            additionalStyle={styles.text}
          />
        }
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#efeff3",
  },
  icon: {
    tintColor: "black",
  },
  text: {
    color: "black",
  },
});

export default Leaderboards;
