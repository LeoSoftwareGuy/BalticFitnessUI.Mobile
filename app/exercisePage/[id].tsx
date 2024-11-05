import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import allExercises from "../../constants/testExercises";
import allMuscleGroups from "@/constants/testMuscleGroups";
import { exerciseImages } from "../../constants/muscleGroupImages";
import { ScrollView } from "react-native-gesture-handler";
import images from "@/constants/images";
import icons from "@/constants/icons";

const exercisePage = () => {
  const { id } = useLocalSearchParams();
  const identifier = Array.isArray(id) ? id.join(", ") : id || "";

  const exercisesForChosenMuscle = allExercises.filter(
    (g) => g.muscleGroupId.toString() === identifier
  );

  const muscleGroup = allMuscleGroups.find(
    (c) => c.id === exercisesForChosenMuscle[0].muscleGroupId
  )?.name;

  return (
    <ImageBackground source={images.logo} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="mt-3 pl-[4px] w-full flex flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={icons.cross}
                resizeMode="contain"
                className="w-3 h-3" 
              />
            </TouchableOpacity>

            <Text className="flex-1 text-center font-pText text-xl text-white">
              {muscleGroup}
            </Text>
          </View>

          <View className="my-2 flex flex-row flex-wrap">
            {exercisesForChosenMuscle.map((exercise) => (
              <View className="mb-4 w-3/6 h-[125px]" key={exercise.id}>
                <Image
                  className="w-full h-[88px]"
                  source={exerciseImages[exercise.id]}
                  resizeMode="contain"
                />
                <Text className="pl-[5px] pt-2 pb-2 font-pText text-[16px] text-white">
                  {exercise.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default exercisePage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});
