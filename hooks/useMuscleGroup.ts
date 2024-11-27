import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { MuscleGroup } from "@/constants/types";

const apiClient = new APIClient<MuscleGroup>("/MuscleGroups/GetMuscleGroup");

const useMuscleGroup = (muscleGroupId: string) =>
  useQuery({
    queryKey: ["muscleGroup", muscleGroupId],
    queryFn: () => apiClient.getSingle(muscleGroupId),
    staleTime: ms("24h"),
  });

export default useMuscleGroup;
