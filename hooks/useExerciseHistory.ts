import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import {ExerciseStatsLastThreeMonths } from "@/constants/types";

const apiClient = new APIClient<ExerciseStatsLastThreeMonths>("/Statistics/GetExerciseHistory");

const useExerciseHistory = (exerciseId: string) =>
  useQuery({
    queryKey: ["exerciseHistory", exerciseId],
    queryFn: () => apiClient.getExerciseHistory(exerciseId),
    staleTime: ms("24h"),
  });

export default useExerciseHistory;
