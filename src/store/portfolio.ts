import { create } from "zustand";
import toast from "react-hot-toast";
import api from "@/utils/api";

interface PortfolioStore {
  portfolios: any[];
}

const initialValues: PortfolioStore = {
  portfolios: [],
};

const usePortfolioStore = create<PortfolioStoreState>((set, get) => ({
  ...initialValues,
  getPortfolios: async () => {
    try {
      const response = await api.get("/portfolio");
      set({ portfolios: response.data.portfolios });
    } catch (error: any) {
      console.error("Error getting portfolios:", error.message);
      toast.error("Failed to fetch portfolios");
    }
  },
  addPortfolio: async (payload) => {
    const { portfolios } = get();
    try {
      const response = await api.post("/portfolio", payload);
      set({ portfolios: [response.data.portfolio, ...portfolios] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error adding portfolio:", error.message);
      toast.error("Failed to add portfolio");
    }
  },
  deletePortfolio: async (id) => {
    const { portfolios } = get();
    try {
      const response = await api.delete("/portfolio", {
        data: { id },
      });
      set({
        portfolios: portfolios.filter((portfolio) => portfolio._id !== id),
      });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting portfolio:", error.message);
      toast.error("Failed to delete portfolio");
    }
  },
  reset: () => set({ portfolios: [] }),
}));

export default usePortfolioStore;
