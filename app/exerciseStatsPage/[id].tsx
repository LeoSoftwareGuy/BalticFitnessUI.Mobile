import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Exercise, ExerciseGroupDto } from "@/constants/types";
import { icons, images } from "@/constants";
import StoredExerciseInfo from "../(todaysWorkout)/components/StoredExerciseInfo";
import { largeExerciseImages } from "@/constants/muscleGroupImages";
import allTrainings from "@/constants/testTrainingDays";

// Ask api for exercise sets of chosen exercise based on its Id
const exerciseStatsPage = () => {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  //const selectedExerciseSetsPerThreeMonths: ExerciseGroupDto[] = [];
  const selectedExerciseSetsPerThreeMonths = Object.values(
    allTrainings[0].exercisesPerMuscleGroup
  ).flat();

  return (
    <ImageBackground source={images.logo} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="py-[40px] pb-[10px] flex-row align-middle">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              resizeMode="contain"
              style={{ width: 24, height: 24, tintColor: "black" }}
            />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-pText text-xl text-white">
            {selectedExerciseSetsPerThreeMonths[0].name}
          </Text>
        </View>
        <Image
          source={largeExerciseImages[selectedExerciseSetsPerThreeMonths[0].id]}
          resizeMode="contain"
          className="my-[36px] w-[full] h-[192px] rounded-lg"
        />
        <Text className="font-pText text-xl text-white">Last 3 months</Text>
        <FlatList
          data={selectedExerciseSetsPerThreeMonths}
          renderItem={({ item }) => (
            <StoredExerciseInfo uniqueExercise={item} exerciseInfo="14.11.2024" />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default exerciseStatsPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
});
