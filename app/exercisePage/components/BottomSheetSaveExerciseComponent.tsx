import { StyleSheet, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Exercise, ExerciseGroupDto, ExerciseSet } from "@/constants/types";
import ExerciseResult from "@/app/exercisePage/components/ExerciseResult";
import { largeExerciseImages } from "../../../constants/muscleGroupImages";
import ExerciseParametersPicker from "./ExerciseParametersPicker";
import FitButton from "@/components/Buttons/FItButton";
import useWorkoutsStore from "@/hooks/stores/useWorkoutsStore";

interface Props {
  exercise: Exercise;
  onClose: () => void;
}
export interface ExerciseParameters {
  ExerciseId: number;
  Reps: number;
  Weight: string;
  Sets: number;
}
type Ref = BottomSheet;

const BottomSheetSaveExerciseComponent = forwardRef<Ref, Props>(
  (props, ref) => {
    const [repsSetsWeight, setRepsSetsWeight] = useState<ExerciseParameters>({
      ExerciseId: props.exercise.id,
      Reps: 1,
      Sets: 1,
      Weight: "",
    });

    const addExercise = useWorkoutsStore((state) => state.addExercise);
    const [isLoading, setIsLoading] = useState(false);

    //Based on specified number of sets,
    // create exerciseSet instance with weight and reps
    // store to local storage
    const addWorkoutToLocalStorage = useCallback(() => {
      setIsLoading(true);

      // Construct exercise sets
      const exerciseSets: ExerciseSet[] = Array.from(
        { length: repsSetsWeight.Sets },
        () => ({
          reps: repsSetsWeight.Reps,
          weight: repsSetsWeight.Weight,
          exerciseId: repsSetsWeight.ExerciseId,
        })
      );

      const exerciseGroup: ExerciseGroupDto = {
        name: props.exercise.name,
        exerciseSets,
      };

      try {
        addExercise(exerciseGroup);
      } catch (error) {
        Alert.alert("Failed to save exercise");
        console.error("Failed to add exercise:", error);
      } finally {
        setIsLoading(false);
        setRepsSetsWeight({
          ExerciseId: props.exercise.id,
          Reps: 1,
          Sets: 1,
          Weight: "",
        });
        props.onClose();
      }
    }, [repsSetsWeight, props.exercise, addExercise, props.onClose]);

    const handleParametersChange = (
      updatedParameters: Partial<ExerciseParameters>
    ) => {
      setRepsSetsWeight((prev) => ({ ...prev, ...updatedParameters }));
    };

    const snapPoints = useMemo(() => ["40%", "90%", "80%"], []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        backgroundStyle={{ backgroundColor: "transparent" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.main}>
          <BottomSheetView style={styles.container}>
            <Image
              className="w-full h-[180px]"
              source={largeExerciseImages[props.exercise.id]}
              resizeMode="contain"
            />
            <Text className="mt-[15px] mb-[8px] font-pText text-white text-[24px]">
              {props.exercise.name}
            </Text>

            <ExerciseResult resultType="Best" exerciseId={props.exercise.id} />
            <ExerciseResult resultType="Last" exerciseId={props.exercise.id} />

            <ExerciseParametersPicker
              parameters={repsSetsWeight}
              onChange={handleParametersChange}
            />

            <BottomSheetView style={styles.button__wrapper}>
              <TouchableOpacity
                onPress={props.onClose}
                className="rounded-lg bg-transparent border border-gray"
                disabled={isLoading}
              >
                <Text className="py-[13px] px-[38px] text-center text-white text-[16px] font-pText">
                  Cancel
                </Text>
              </TouchableOpacity>

              <FitButton
                title={"Add to workout"}
                isLoading={isLoading}
                buttonStyles={{
                  paddingVertical: 12,
                  paddingHorizontal: 38,
                  borderRadius: 8,
                }}
                containerStyles="ml-[22px]"
                handlePress={addWorkoutToLocalStorage}
              />
            </BottomSheetView>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomSheetSaveExerciseComponent;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#2C2C2C",
    width: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button__wrapper: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
