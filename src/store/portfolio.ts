import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { getHeaders } from "@/utils/helpers";

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
      const headers: any = getHeaders();
      const response = await axios.get("/api/portfolio/get-portfolios", {
        ...headers,
      });
      set({ portfolios: response.data.portfolios });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addPortfolio: async (payload) => {
    const { portfolios } = get();
    try {
      const headers: any = getHeaders();
      const response = await axios.post(
        "/api/portfolio/add-portfolio",
        payload,
        { ...headers },
      );
      set({ portfolios: [response.data.portfolio, ...portfolios] });
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
        portfolios: portfolios.filter((portfolio) => portfolio._id !== id),
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
