import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { MuscleGroupDto } from "@/constants/types";

const apiClient = new APIClient<MuscleGroupDto>("/MuscleGroups/GetMuscleGroups");

const useMuscleGroups = () =>
  useQuery({
    queryKey: ["muscleGroups"],
    queryFn: () => apiClient.getAllMuscleGroups(),
    staleTime: ms("24h"),
  });

export default useMuscleGroups;
