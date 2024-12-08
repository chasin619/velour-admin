import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage/storage";
import useConfigStore from "./config";

const initialValues: any = {
  accessToken: null,
};

const useAuthStore = create(
  persist<AuthStateStore>(
    (set) => ({
      ...initialValues,
      login: async (payload) => {
        try {
          useConfigStore.getState().setLoading(true);
          const response = await axios.post("/api/auth/login", payload);
          set({ accessToken: response.data.accessToken });
          document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=${30 * 24 * 60 * 60};`;
          toast.success("Logged in successfully!");
        } catch (error: any) {
          toast.error(error.response?.data?.error || "Login failed!");
        } finally {
          useConfigStore.getState().setLoading(false);
        }
      },
      logout: () => {
        set({ accessToken: null });
        document.cookie = "accessToken=; path=/; max-age=0;";
        toast.success("Logout successfully!");
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useAuthStore;
