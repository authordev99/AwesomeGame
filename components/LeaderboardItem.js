import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SpaceFiller from "./SpaceFiller";

const LeaderboardItem = ({ item, index, onPress }) => {
  const onPressItem = () => {
    onPress(item);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <Text>{index + 1}</Text>
      <SpaceFiller width={24} />
      <View style={styles.imageProfileBackground}>
        <Text style={styles.firstLetter}>{item?.user?.username.charAt(0)}</Text>
      </View>
      <SpaceFiller width={18} />
      <View style={styles.contentContainer}>
        <Text style={styles.usernameText}>{item?.user?.username}</Text>
        <SpaceFiller height={4} />
        <View style={styles.categoryContainer}>
          <Image source={require('../images/category.png')} style={styles.categoryImage} />
          <SpaceFiller width={4} />
          <Text>{`${item?.data?.category}`}</Text>
        </View>

      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{`${item?.user?.score} pts`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imageProfileBackground: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#B2BEB5",
    justifyContent: "center",
    alignItems: "center",
  },
  firstLetter: { color: "white", fontWeight: "bold", fontSize: 16 },
  contentContainer: { flex: 1 },
  usernameText: {  fontWeight: "bold", },
  scoreContainer: { backgroundColor: "#5DBC7D", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  score: { color: "white", fontWeight: "bold" },
  categoryImage: {height: 12, width: 12},
  categoryContainer: {flexDirection: 'row', alignItems: 'center'},
});


export default LeaderboardItem;
