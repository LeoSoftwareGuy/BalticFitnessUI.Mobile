import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import { ExerciseDto } from "@/constants/types";
import { router } from "expo-router";
import useMuscleGroupsWithExercises from "@/hooks/useMuscleGroupsWithExercises";


const EachMuscleGroupTrainingHistory = () => {
  const {
    data: muscleGroups = [],
    error,
    isLoading,
  } = useMuscleGroupsWithExercises();

  const [chosenMuscleGroupId, setChosenMuscleGroupId] = useState<number>();
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);

  useEffect(() => {
    setExercises(
      muscleGroups.filter((e) => e.id === chosenMuscleGroupId)[0].exercises
    );
  }, [chosenMuscleGroupId]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>
          Failed to load data. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="mt-[30px] w-ull bg-transparent ">
      <Text className="mb-[20px] font-pText text-white text-lg">Exercises</Text>
      <FlatList
        data={muscleGroups}
        renderItem={({ item }) => (
          <FilterButton
            title={item.name}
            onClick={() => setChosenMuscleGroupId(item.id)}
            isSelected={chosenMuscleGroupId === item.id}
          />
        )}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      />

      <View className="mt-[40px] w-full flex-col">
        {exercises?.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(`/exerciseStatsPage/${exercise.id}`)}
          >
            <View style={[styles.exerciseContainer]}>
              <Text className="py-[15px] font-pRegular text-[17px] text-white">
                {exercise.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default EachMuscleGroupTrainingHistory;

const styles = StyleSheet.create({
  contentContainer: {
    columnGap: 10,
  },
  exerciseContainer: {
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: "#9A9A9A",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
