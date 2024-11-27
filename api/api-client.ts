import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "@/hooks/useAuthStore";
import { Alert } from "react-native";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.182:7081/api", // Update to your local IP address
  timeout: 5000, // Aborts request if no response in 5 seconds
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
    const response = await axios.post("/Auth/refresh");
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
      const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
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
      return response.data;
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
}

export default APIClient;
