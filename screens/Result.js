/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  FlatList, Image,
  SafeAreaView,
  StyleSheet,
  Text, TouchableOpacity, View,
} from "react-native";
import Header from "../components/Header";
import SpaceFiller from "../components/SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";


function Result({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { data } = route.params;
  const image = data.correct === data.totalQuestion ? require("../images/congratulation.png") : require("../images/goodJob.png");

  const onPress = () => {
    navigation.replace("Leaderboards");
  }

  return (
    <View style={{ justifyContent: "center", flex: 1, backgroundColor: "#4a90e2" }}>
      <Header headerRightElement={
        <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => navigation.goBack()}>
          <Image source={require("../images/close.png")} style={{ width: 24, height: 24, tintColor: 'white' }} />
        </TouchableOpacity>
      } />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image source={image} style={{ width: 150, height: 150 }} />
        <SpaceFiller height={24} />
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>{data.username}</Text>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 24 }}>Your total
          score is <Text>{data.finalScore}</Text></Text>
        <SpaceFiller height={24} />
        <View style={{ alignSelf: "center", padding: 16 }}>
          <Text style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "white",
            fontSize: 24,
            textTransform: "uppercase",
            marginVertical: 16,
          }}>summary :</Text>
          <Text style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 16,
          }}>{`Total Questions : ${data.totalQuestion}`}</Text>
          <Text style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 16,
          }}>{`Total Correct Answer : ${data.correct}`}</Text>
          <Text
            style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>{`Total Wrong Answer : ${data.wrong}`}</Text>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>{`Total Skip : ${data.skip}`}</Text>
        </View>
      </View>
      <TouchableOpacity style={{marginBottom: insets.bottom, backgroundColor: '#5DBC7D', borderRadius: 36, marginHorizontal: 48, alignItems: 'center', padding: 16}} onPress={onPress} >
        <Text style={{textTransform:'uppercase', fontWeight: 'bold', color: 'white'}}>Leaderboards</Text>
      </TouchableOpacity>
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

export default Result;
