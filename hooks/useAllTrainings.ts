import APIClient from "@/api/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import {Training } from "@/constants/types";

const apiClient = new APIClient<Training>("/Fitness/GetTrainings");

const useAllTrainings = () =>
  useQuery({
    queryKey: ["trainings"],
    queryFn: () => apiClient.getAllTrainings(),
    staleTime: ms("24h"),
  });

export default useAllTrainings;
