import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { StatsSummaryBasedOnFilter } from "@/constants/types";

const apiClient = new APIClient<StatsSummaryBasedOnFilter>("/Statistics/GetStats/filterBy?filterBy=");

const usePerformanceStats = (filterBy:string) =>
  useQuery({
    queryKey: ["stats", filterBy],
    queryFn: async () => {
      const response = await apiClient.getStats(filterBy);
      return response;
    },
    staleTime: ms("24h"),
  });

export default usePerformanceStats;
