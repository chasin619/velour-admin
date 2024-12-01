import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage/storage";

const initialValues: any = {
  accessToken: null,
};

const useAuthStore = create(
  persist<AuthStateStore>(
    (set) => ({
      ...initialValues,
      login: async (payload) => {
        try {
          const response = await axios.post("/api/login", payload);
          set({ accessToken: response.data.accessToken });
          toast.success("Logged in successfully!");
        } catch (error: any) {
          toast.error(error.response?.data?.error || "Login failed!");
        }
      },
      logout: () => {
        set({ accessToken: null });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useAuthStore;
