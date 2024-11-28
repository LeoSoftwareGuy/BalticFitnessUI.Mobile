import {
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import StoredExerciseInfo from "./components/StoredExerciseInfo";
import FitButton from "@/components/Buttons/FItButton";
import { ExerciseGroupDto, ExerciseSet } from "@/constants/types";
import useWorkoutsStore from "@/hooks/stores/useWorkoutsStore";
import APIClient from "@/api/api-client";

const todaysWorkout = () => {
  const todaysWorkoutFromLocalStorage: ExerciseGroupDto[] = useWorkoutsStore(
    (c) => c.exercisesAndTheirSets
  );
  const clearExercisesFromLocalStorage = useWorkoutsStore(
    (c) => c.clearExercises
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    try {
      const apiClient = new APIClient<ExerciseSet[]>("/Fitness/SaveTraining");
      const exerciseSetDtos = todaysWorkoutFromLocalStorage.flatMap(
        (exerciseGroup) => exerciseGroup.exerciseSets
      );

      await apiClient.saveTraining(exerciseSetDtos);

      Alert.alert("Success", "Workout saved successfully!");
      clearExercisesFromLocalStorage();
    } catch (error) {
      Alert.alert("Error", "Failed to save workout");
    } finally {
      setIsLoading(false);
    }
  }, [todaysWorkoutFromLocalStorage, clearExercisesFromLocalStorage]);

  return (
    <ImageBackground source={images.logo} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        {todaysWorkoutFromLocalStorage.length === 0 ? (
          <>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={icons.cross}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <Text className="text-center font-pText text-xl text-white">
              Today's workout
            </Text>
            <View className="w-full h-full justify-center items-center">
              <Text className="w-full text-center text-2xl font-pText text-gray">
                Haven't trained yet? Get your ass to the gym.
              </Text>
            </View>
          </>
        ) : (
          <FlatList
            data={todaysWorkoutFromLocalStorage}
            renderItem={({ item }) => (
              <StoredExerciseInfo
                uniqueExercise={item}
                exerciseInfo={item.name}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <Image
                    source={icons.cross}
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
                <Text className="flex-1 text-center font-pText text-xl text-white">
                  Today's workout
                </Text>
              </View>
            }
            ListFooterComponent={
              <FitButton
                title="Save today's workout"
                isLoading={isLoading}
                handlePress={onSubmit}
                containerStyles="mt-[70px]"
                buttonStyles={{
                  paddingVertical: 17,
                  paddingHorizontal: 38,
                  borderRadius: 7,
                }}
              />
            }
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default todaysWorkout;

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
