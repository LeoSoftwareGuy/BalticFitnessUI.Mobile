import { eachMonthOfInterval } from "date-fns";

// Type for Exercise
export interface Exercise {
  id: number;
  muscleGroupId: number;
  name: string;
  imageUrl: string;
}

// Type for ExerciseSet
export interface ExerciseSet {
  exerciseId: number;
  reps: number;
  weight: string;
}

export interface ExerciseGroupDto {
  name: string;
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

export interface MuscleGroup {
  id: number;
  name: string;
  imageUrl: string;
  type: string;
  exercises: Exercise[];
}

export interface StatsSummaryBasedOnFilter {
  sessionsCount: number;
  exercisesCount: number;
  muscleGroupsCount: number;
}

export interface User {
  email: string;
  name: string;
}

export interface ExerciseStats {
  exerciseName: string;
  reps: number;
  sets: number;
  weight: string;
}
