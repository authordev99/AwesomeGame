import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SpaceFiller from "./SpaceFiller";

const CategoryItem = ({ data, onPress }) => {
  const backgroundSelectedStyle = data.isSelected ? { backgroundColor: "#B2BEB5" } : null;
  const textSelectedStyle = data.isSelected ? { color: "#ffffff" } : null;

  const onPressCategory = () => {
    onPress && onPress(data);
  };

  return (
    <TouchableOpacity style={[styles.container, backgroundSelectedStyle]} onPress={onPressCategory}>
      <View style={{ flexDirection: "row" }}>
        <Image source={data.image} style={{ width: 60, height: 60 }} />
        <SpaceFiller width={24} />
        <View style={{ alignItems: "flex-start", flex: 1, justifyContent: "center" }}>
          <Text style={[styles.title, textSelectedStyle]}>{data.category}</Text>
          <Text style={[styles.subtitle, textSelectedStyle]}>{`Total ${data.questions.length} questions`}</Text>
        </View>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});


export default CategoryItem;
