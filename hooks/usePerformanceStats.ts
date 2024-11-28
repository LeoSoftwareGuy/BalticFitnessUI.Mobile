import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { StatsSummaryBasedOnFilter } from "@/constants/types";

const apiClient = new APIClient<StatsSummaryBasedOnFilter>("/Statistics/GetStats");

const usePerformanceStats = (filterBy:string) =>
  useQuery({
    queryKey: ["stats", filterBy],
    queryFn: () => apiClient.getSingle(filterBy),
    staleTime: ms("24h"),
  });

export default usePerformanceStats;
