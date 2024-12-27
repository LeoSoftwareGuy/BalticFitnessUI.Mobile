import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "@/hooks/stores/useAuthStore";
import { Alert } from "react-native";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.165:7081/api", // Update to your local IP address
  timeout: 50000, // Aborts request if no response in 5 seconds
  withCredentials: true, // Include cookies
});

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle 401 errors (unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        // Retry the failed request with the new token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error); // Propagate other errors
  }
);

async function refreshToken() {
  const authState = useAuthStore.getState();
  try {
    const response = await axios.post("/Auth/refresh", {}, { withCredentials: true });
    const newAccessToken = response.data; // access token as a string
    authState.setAccessToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed", error);

    authState.logOut();
    window.location.href = "/login";
    return null;
  }
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getSingle = async (id: string | number): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(`${this.endpoint}${id}`);
      return response.data;
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };

  getExerciseStats = async (id: string | number, type: string): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(
        `${this.endpoint}/${id}/${type}`
      );

      const {exerciseStats} = response.data as any;
      return exerciseStats ?? response.data;  // Fallback to data if destructuring fails
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };


  getExerciseHistory = async (id: string | number): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
      const { exerciseStatsLastThreeMonths } = response.data as any;
      
      return exerciseStatsLastThreeMonths ?? response.data;
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };


  getStats = async (filterBy: string): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(
        `${this.endpoint}${filterBy}`
      );
      const { summaryInfoBasedOnFilter } = response.data as any;

      return summaryInfoBasedOnFilter ?? response.data;  // Fallback to data if destructuring fails
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };

  getAll = async (): Promise<T[]> => {
    try {
      const response = await axiosInstance.get<T[]>(this.endpoint);
      return response.data;
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };


  getAllMuscleGroups = async (): Promise<T[]> => {
    try {
      const response = await axiosInstance.get<{ muscleGroupDtos: T[] }>(this.endpoint); // wrapped in muscleGroupDtos
      return response.data.muscleGroupDtos;
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };

  getMuscleGroup = async (id: string | number): Promise<T> => {
    try {
      const response = await axiosInstance.get<{ muscleGroupDto: T }>(`${this.endpoint}/${id}`);
      return response.data.muscleGroupDto;
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };


  register = async (data: T): Promise<string> => {
    try {
      const response = await axiosInstance.post(this.endpoint, data);
      return response.data;
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };


  getAllTrainings = async (): Promise<T[]> => {
    try {
      const response = await axiosInstance.get<T[]>(this.endpoint);
      const { sortedByDayTrainingDtos } = response.data as any;
//   public record GetTrainingsSortedByDayResult(List<SortedByDayTraining> SortedByDayTrainingDtos);
      return sortedByDayTrainingDtos ?? response.data;  
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  };


  saveTraining = async (data: T): Promise<string> => {
    const fullUrl = `${axiosInstance.defaults.baseURL}${this.endpoint}`;

    const payload = {
      exerciseSets: data,
    };
    try {
      const response = await axiosInstance.post(this.endpoint, payload);
      return response.data;
    } catch (error: any) {
      console.error("API Request failed:", error);
      Alert.alert("Error", error.message || "Request failed");
      return Promise.reject(error);
    }
  }
}

export default APIClient;
