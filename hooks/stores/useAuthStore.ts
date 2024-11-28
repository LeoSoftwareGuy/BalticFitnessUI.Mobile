// State for authorzized user

import { User } from "@/constants/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  //   user: User | null;
  accessToken: string | null;

  //   setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  logOut: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      accessToken: null,
      //   setUser: (user: User) => set({ user }),
      setAccessToken: (accessToken: string) => {
        set({ accessToken });
        AsyncStorage.setItem("accessToken", accessToken);
      },
      logOut: () => {
        set({ accessToken: null });
        AsyncStorage.removeItem("accessToken");
      },
      checkAuth: async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          set({ accessToken: token });
        }
      },
    }),
    {
      name: "userInfo-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
