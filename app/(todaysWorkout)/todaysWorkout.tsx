import {
  ImageBackground,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import allTrainings from "@/constants/testTrainingDays";
import StoredExerciseInfo from "./components/StoredExerciseInfo";
import FitButton from "@/components/Buttons/FItButton";
import { ExerciseGroupDto } from "@/constants/types";

const todaysWorkout = () => {
  // There should be 1 training in localStorage for todays date.
  const todaysWorkoutFromLocalStorage: ExerciseGroupDto[] = [];
  // const todaysWorkoutFromLocalStorage = Object.values(
  //   allTrainings[0].exercisesPerMuscleGroup
  // ).flat();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(() => {
    setIsLoading(true);
    console.log("Submitted");
    setIsLoading(false);
  }, []);

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
