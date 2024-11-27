import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { ExerciseStats } from "@/constants/types";

interface TypeProps {
  type: "Best" | "Last";
}

const apiClient = new APIClient<ExerciseStats>(
  "/Statistics/GetBestExerciseStats"
);

const useBestResult = (exerciseId: string, exerciseStatsType: TypeProps) =>
  useQuery({
    queryKey: [exerciseStatsType, exerciseId],
    queryFn: () =>
      apiClient.getExerciseStats(exerciseId, exerciseStatsType.type),
    staleTime: ms("24h"),
  });

export default useBestResult;
