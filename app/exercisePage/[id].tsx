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

import { ScrollView } from "react-native-gesture-handler";
import images from "@/constants/images";
import icons from "@/constants/icons";
import ExerciseComponent from "@/app/exercisePage/components/ExerciseComponent";
import { ExerciseDto } from "@/constants/types";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetSaveExerciseComponent from "@/app/exercisePage/components/BottomSheetSaveExerciseComponent";
import useMuscleGroup from "@/hooks/useMuscleGroup";

const exercisePage = () => {
  const { id } = useLocalSearchParams();
  const identifier = Array.isArray(id) ? id.join(", ") : id || "";
  const {
    data: muscleGroup,
    isLoading,
    error,
  } = useMuscleGroup(identifier);

  const [selectedExercise, setSelectedExercise] = useState<ExerciseDto | null>(
    null
  );

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

  const selectExercise = (exercise: ExerciseDto) => {
    setSelectedExercise(exercise);
    console.log("exercise", exercise);
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
              {muscleGroup?.name}
            </Text>
          </View>

          <View className="my-2 flex flex-row flex-wrap">
            {muscleGroup?.exercises.map((exercise) => (
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
