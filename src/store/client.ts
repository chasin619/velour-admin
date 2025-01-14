import { create } from "zustand";
import toast from "react-hot-toast";
import api from "@/utils/api";

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
      const response = await api.get("/client");
      set({ clients: response.data.clients });
    } catch (error: any) {
      console.error("Error getting clients:", error.message);
      toast.error("Failed to fetch clients");
    }
  },
  addClient: async (payload) => {
    const { clients } = get();
    try {
      const response = await api.post("/client", payload);
      set({ clients: [response.data.client, ...clients] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error adding client:", error.message);
      toast.error("Failed to add client");
    }
  },
  deleteClient: async (id) => {
    const { clients } = get();
    try {
      const response = await api.delete("/client", {
        data: { id },
      });
      set({ clients: clients.filter((client) => client._id !== id) });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting client:", error.message);
      toast.error("Failed to delete client");
    }
  },
  editClient: async (payload) => {
    const { clients } = get();
    try {
      const response = await api.put("/client", payload);
      set({
        clients: clients.map((client) =>
          client.id === payload.id
            ? { ...client, ...response.data.updatedClient }
            : client,
        ),
      });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error editing client:", error.message);
      toast.error("Failed to edit client");
    }
  },
  reset: () => set({ clients: [] }),
}));

export default useClientStore;
