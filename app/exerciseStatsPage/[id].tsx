import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Exercise } from "@/constants/types";

const exerciseStatsPage = () => {
  const { id } = useLocalSearchParams();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default exerciseStatsPage;

const styles = StyleSheet.create({});
