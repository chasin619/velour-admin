import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

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
      const response = await axios.get("/api/portfolio/get-portfolios");
      set({ portfolios: response.data.portfolios });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addPortfolio: async (payload) => {
    const { portfolios } = get();
    try {
      const response = await axios.post(
        "/api/portfolio/add-portfolio",
        payload,
      );
      set({ portfolios: [...portfolios, response.data.portfolio] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  deletePortfolio: async (id) => {
    const { portfolios } = get();
    try {
      const response = await axios.delete("/api/portfolio/delete-portfolio", {
        data: { id },
      });
      set({
        portfolios: portfolios.filter((portfolio) => portfolio.id !== id),
      });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting Portfolio:", error.message);
      toast.error("Failed to delete the Portfolio");
    }
  },
  reset: () => set({ portfolios: [] }),
}));

export default usePortfolioStore;
