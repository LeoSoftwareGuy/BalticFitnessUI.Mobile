// Type for Exercise
export interface Exercise {
    id: string;
    muscleGroupId: number;
    name: string;
    imageUrl: string;
  }
  
  // Type for ExerciseSet
  export interface ExerciseSet {
    reps: number;
    weight: number;
    pre: number;
    exercise: Exercise;
  }
  
  export interface ExerciseGroupDto {
    name: string;
    id: string; 
    exerciseSets: ExerciseSet[];
  }
  // Type for Training
  export interface Training {
    trainedAtTime: string;
    trainedAtMonth: number;
    trainedAtDay: number;
    trainedAtYear: number;
    exercisesPerMuscleGroup: Record<string, ExerciseGroupDto[]>;
  }