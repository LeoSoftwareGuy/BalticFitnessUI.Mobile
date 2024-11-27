import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { MuscleGroup } from "@/constants/types";

const apiClient = new APIClient<MuscleGroup>("/MuscleGroups/GetMuscleGroups");

const useMuscleGroups = () =>
  useQuery({
    queryKey: ["muscleGroups"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });

export default useMuscleGroups;
