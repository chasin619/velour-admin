import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { getHeaders } from "@/utils/helpers";

interface ClientStore {
  clients: any[];
}

const initialValues: ClientStore = {
  clients: [],
};

const useClientStore = create<ClientStoreState>((set, get) => ({
  ...initialValues,
  getClients: async () => {
    try {
      const headers: any = getHeaders();
      const response = await axios.get("/api/client/get-clients", {
        ...headers,
      });
      set({ clients: response.data.clients });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addClient: async (payload) => {
    const { clients } = get();
    try {
      const headers: any = getHeaders();
      const response = await axios.post("/api/client/add-client", payload, {
        ...headers,
      });
      set({ clients: [response.data.client, ...clients] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
}));

export default useClientStore;
