import { ExerciseGroupDto } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WorkoutStoreModel{
    exercisesAndTheirSets: ExerciseGroupDto[];
    addExercise: (newExercise: ExerciseGroupDto) => void;
    clearExercises: () => void;
}

const useWorkoutsStore = create(
    persist<WorkoutStoreModel>(
      (set) => ({
        exercisesAndTheirSets: [],

        addExercise: (newExercise: ExerciseGroupDto) =>
          set((state) => {
            const existingExerciseIndex = state.exercisesAndTheirSets.findIndex(
              (exercise) => exercise.name === newExercise.name
            );
  
            if (existingExerciseIndex !== -1) {
              // Merge exerciseSets if exercise already exists
              const updatedExercises = [...state.exercisesAndTheirSets];
              const existingExercise = updatedExercises[existingExerciseIndex];
  
              updatedExercises[existingExerciseIndex] = {
                ...existingExercise,
                exerciseSets: [
                  ...existingExercise.exerciseSets,
                  ...newExercise.exerciseSets,
                ],
              };
  
              return { exercisesAndTheirSets: updatedExercises };
            } else {
              // Add new exercise if it doesn't exist
              return {
                exercisesAndTheirSets: [...state.exercisesAndTheirSets, newExercise],
              };
            }
          }),
        clearExercises: () => set({ exercisesAndTheirSets: [] }),
      }),
      {
        name: "workout-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );
  
  export default useWorkoutsStore;