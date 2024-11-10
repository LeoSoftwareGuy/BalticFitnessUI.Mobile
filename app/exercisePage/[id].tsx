import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import allExercises from "../../constants/testExercises";
import allMuscleGroups from "@/constants/testMuscleGroups";

import { ScrollView } from "react-native-gesture-handler";
import images from "@/constants/images";
import icons from "@/constants/icons";
import ExerciseComponent from "@/app/exercisePage/components/ExerciseComponent";
import { Exercise } from "@/constants/types";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetSaveExerciseComponent from "@/app/exercisePage/components/BottomSheetSaveExerciseComponent";

const exercisePage = () => {
  const { id } = useLocalSearchParams();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const identifier = Array.isArray(id) ? id.join(", ") : id || "";

  const exercisesForChosenMuscle = allExercises.filter(
    (g) => g.muscleGroupId.toString() === identifier
  );

  const muscleGroup = allMuscleGroups.find(
    (c) => c.id === exercisesForChosenMuscle[0].muscleGroupId
  )?.name;

  const bottomSheetRef = useRef<BottomSheet>(null);

  const expandBottomSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, []);

  const closeBottomSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, []);

  const selectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    if (bottomSheetRef.current) {
      expandBottomSheet();
    }
  };
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
              <ExerciseComponent
                key={exercise.id}
                exercise={exercise}
                onClick={() => selectExercise(exercise)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {selectedExercise && (
        <BottomSheetSaveExerciseComponent
          ref={bottomSheetRef}
          exercise={selectedExercise}
          onClose={closeBottomSheet}
        />
      )}
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
