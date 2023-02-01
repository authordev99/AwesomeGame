import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react';
const CategoryItem = ({data, onPress}) => {
  const backgroundSelectedStyle =  data.isSelected ? { backgroundColor: "#000000"} : null;
  const textSelectedStyle =  data.isSelected ? { color: "#ffffff"} : null;

  const onPressCategory = () => {
    onPress && onPress(data);
  }

  return (
    <TouchableOpacity style={[styles.container, backgroundSelectedStyle]} onPress={onPressCategory}>
      <Text style={textSelectedStyle}>{data.category}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {borderWidth: 1, margin: 16, alignItems: 'center', padding: 16},
});


export default CategoryItem;
