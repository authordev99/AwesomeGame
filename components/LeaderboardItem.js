import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SpaceFiller from "./SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LeaderboardItem = ({ item, index, onPress }) => {
  const onPressItem = () => {
    onPress(item);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <Text>{index + 1}</Text>
      <SpaceFiller width={24} />
      <View style={styles.imageProfileBackground}>
        <Text style={styles.firstLetter}>{item?.username.charAt(0)}</Text>
      </View>
      <SpaceFiller width={18} />
      <Text style={styles.usernameContainer}>{item?.username}</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{item?.finalScore}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
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
  usernameContainer: { flex: 1 },
  scoreContainer: { backgroundColor: "#5DBC7D", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  score: { color: "white", fontWeight: "bold" },
});


export default LeaderboardItem;
