import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import {MuscleGroupDto } from "@/constants/types";

const apiClient = new APIClient<MuscleGroupDto>("/MuscleGroups/GetMuscleGroup");

const useMuscleGroup = (muscleGroupId: string) =>
  useQuery({
    queryKey: ["muscleGroup", muscleGroupId],
    queryFn: () => apiClient.getMuscleGroup(muscleGroupId),
    staleTime: ms("24h"),
  });

export default useMuscleGroup;
