import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import allMuscleGroups from "@/constants/testMuscleGroups";
import allExercises from "@/constants/testExercises";
import FilterButton from "./FilterButton";
import { Exercise } from "@/constants/types";
import { router } from "expo-router";

// You need to get all exercises from the db, and then simply filter them
// based on chosen muscleGroup. I dont even think you need separate state
const EachMuscleGroupTrainingHistory = () => {
  const [chosenMuscleGroupId, setChosenMuscleGroupId] = useState<number>();
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
      muscleGroupId: 4,
      name: "ArnoldPress",
      imageUrl: "img/delts/ArnoldPress.jpg",
    },
    {
      id: "65c5fa62-f772-4cbb-8391-4ff92e46e1f3",
      muscleGroupId: 4,
      name: "FrontDeltRaises",
      imageUrl: "img/delts/FrontDeltRaises.jpg",
    },
    {
      id: "52c5f2bc-17c3-46a5-ae58-7b211350b3cd",
      muscleGroupId: 4,
      name: "RearDeltsRaises",
      imageUrl: "img/delts/RearDeltsRaises.jpg",
    },
    {
      id: "cda4dd94-dc9c-43c4-98ee-66ea884f8cc0",
      muscleGroupId: 4,
      name: "ShouldBarbelSmithPress",
      imageUrl: "img/delts/ShouldBarbelSmithPress.jpg",
    },
    {
      id: "3a8ddb87-5c38-409f-923c-dfc0a9dd53ef",
      muscleGroupId: 4,
      name: "ShouldDumbellPress",
      imageUrl: "img/delts/ShouldDumbellPress.jpg",
    },
    {
      id: "606e00eb-04fc-4da3-9941-d3a3febd74d5",
      muscleGroupId: 4,
      name: "ShoulderHammerPress",
      imageUrl: "img/delts/ShoulderHammerPress.jpg",
    },
    {
      id: "3fe98bff-5456-4cc2-bce5-3ec3a50bacb2",
      muscleGroupId: 4,
      name: "StandingLateralRaises",
      imageUrl: "img/delts/StandingLateralRaises.jpg",
    },
  ]);

  useEffect(() => {
    setExercises(
      allExercises.filter((e) => e.muscleGroupId === chosenMuscleGroupId)
    );
  }, [chosenMuscleGroupId]);

  return (
    <View className="mt-[30px] w-ull bg-transparent ">
      <Text className="mb-[20px] font-pText text-white text-lg">Exercises</Text>
      <FlatList
        data={allMuscleGroups}
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
});
