import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { MuscleGroupDto } from "@/constants/types";

const apiClient = new APIClient<MuscleGroupDto>("/MuscleGroups/GetMuscleGroupsWithExercises");

const useMuscleGroupsWithExercises = () =>
  useQuery({
    queryKey: ["muscleGroupsWithExercises"],
    queryFn: () => apiClient.getAllMuscleGroups(),
    staleTime: ms("24h"),
  });

export default useMuscleGroupsWithExercises;
