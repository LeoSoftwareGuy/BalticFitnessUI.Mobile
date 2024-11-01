import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const exercisePage = () => {
  const { id } = useLocalSearchParams();
  const identifier = Array.isArray(id) ? id.join(", ") : id || "";
  // call backend based on id for exercises
  return (
    <View>
      <Text>[id]</Text>
    </View>
  );
};

export default exercisePage;

const styles = StyleSheet.create({});
