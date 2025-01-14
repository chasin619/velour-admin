import { zustandStorage } from "@/store/storage/storage";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

api.interceptors.request.use(
  async (config: any) => {
    const authStore = await zustandStorage.getItem("auth");
    if (!authStore) {
      return config;
    }
    const auth = JSON.parse(authStore);

    if (auth?.state?.accessToken) {
      const Authorization = `Bearer ${auth?.state.accessToken}`;
      config.headers["Authorization"] = Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
