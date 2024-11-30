import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface BlogStore {
  blogs: any[];
  reviews: any[];
  portfolios: any[];
}

const initialValues: BlogStore = {
  blogs: [],
  reviews: [],
  portfolios: [],
};

const useHomeStore = create<HomeStoreState>((set, get) => ({
  ...initialValues,
  initilizeHomeStore: async () => {
    const { getAllBlogs, getReviews, getPortfolios } = get();
    await getAllBlogs();
    await getReviews();
    await getPortfolios();
  },
  getAllBlogs: async () => {
    try {
      const response = await axios.get("/api/blogs");
      set({ blogs: response.data.blogs });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addBlog: async (payload) => {
    const { blogs } = get();
    try {
      const response = await axios.post("/api/addBlog", payload);
      set({ blogs: [...blogs, response.data.blog] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  getReviews: async () => {
    try {
      const response = await axios.get("/api/reviews");
      set({ reviews: response.data.reviews });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addReview: async (payload) => {
    const { reviews } = get();
    try {
      const response = await axios.post("/api/addReview", payload);
      set({ reviews: [...reviews, response.data.review] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  getPortfolios: async () => {
    try {
      const response = await axios.get("/api/portfolios");
      set({ portfolios: response.data.portfolios });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addPortfolio: async (payload) => {
    const { portfolios } = get();
    try {
      const response = await axios.post("/api/addPortfolio", payload);
      set({ portfolios: [...portfolios, response.data.portfolio] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  reset: () => set({ blogs: [], reviews: [], portfolios: [] }),
}));

export default useHomeStore;
