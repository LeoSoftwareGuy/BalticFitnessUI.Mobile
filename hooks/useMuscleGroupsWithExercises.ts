import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { MuscleGroup } from "@/constants/types";

const apiClient = new APIClient<MuscleGroup>("/MuscleGroups/GetMuscleGroupsWithExercises");

const useMuscleGroupsWithExercises = () =>
  useQuery({
    queryKey: ["muscleGroupsWithExercises"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });

export default useMuscleGroupsWithExercises;
