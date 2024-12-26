  //try more sets per exercise
  // try more exercies per muscleGroup

import { Training } from "./types";

  // try more muscleGroups per training
const allTrainings: Training[] = [
    {
      trainedAtTime: "09:38",
      trainedAtMonth: 10,
      trainedAtDay: 20,
      trainedAtYear: 2024,
      exercisesPerMuscleGroup: {
        Shoulders: [
          {
            name: "Arnold Press",
            exerciseSets: [
              {
                reps: 10,
                weight: "40",
                exerciseId:12
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:12
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:12
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:12
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:12
              },
            ],
          },
          {
            name: "Standing Lateral Raises",
            exerciseSets: [
              {
                reps: 10,
                weight: "40",
                exerciseId:41
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:41
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:41
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:41
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:41
              },
            ],
          },
        ],
      },
    },
    {
      trainedAtTime: "12:30",
      trainedAtMonth: 10,
      trainedAtDay: 18,
      trainedAtYear: 2024,
      exercisesPerMuscleGroup: {
        Chest: [
          {
            name: "Bench Press",        
            exerciseSets: [
              {
                reps: 10,
                weight: "40",
                exerciseId:1
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:1
              },
              {
                reps: 10,
                weight: "40",
                exerciseId:1
              },
            ],
          },
        ],
      },
    }
  ];



export default allTrainings;