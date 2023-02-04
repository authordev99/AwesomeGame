import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import SpaceFiller from "./SpaceFiller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContextState } from "../context";

const UserSectionItem = ({ user, onPress }) => {
  const onPressItem = () => {
    onPress && onPress(user);
  };
  return (
    <View style={styles.container} onPress={onPressItem}>
      <View style={styles.imageProfileBackground}>
        <Text style={styles.firstLetter}>{user?.username?.charAt(0) ?? "?"}</Text>
      </View>
      <SpaceFiller width={18} />
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{user?.username ?? "-"}</Text>
        <Text style={styles.usernameText}>{`Score ${user?.score ?? "-"}`}</Text>
      </View>
      <TouchableOpacity style={[styles.scoreContainer, {backgroundColor: user ? '#e35d5d' : '#5DBC7D'}]} onPress={onPressItem}>
        <Text style={styles.score}>{user ? "Logout" : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
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
  usernameText: { fontWeight: "bold"},
  scoreContainer: { backgroundColor: "#5DBC7D", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  score: { color: "white", fontWeight: "bold" },
});


export default UserSectionItem;
