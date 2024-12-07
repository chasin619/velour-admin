import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface BlogStore {
  blogs: any[];
  reviews: any[];
  portfolios: any[];
  loading: boolean;
}

const initialValues: BlogStore = {
  blogs: [],
  reviews: [],
  portfolios: [],
  loading: false,
};

const useHomeStore = create<HomeStoreState>((set, get) => ({
  ...initialValues,
  initilizeHomeStore: async () => {
    const { getAllBlogs } = get();
    await getAllBlogs();
  },
  setLoading: (loading) => {
    set({ loading });
  },
  getAllBlogs: async () => {
    try {
      const response = await axios.get("/api/blog/get-blogs");
      set({ blogs: response.data.blogs });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addBlog: async (payload) => {
    const { blogs } = get();
    try {
      const response = await axios.post("/api/blog/add-blog", payload);
      set({ blogs: [...blogs, response.data.blog] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  deleteBlog: async (id) => {
    const { blogs, setLoading } = get();
    setLoading(true);
    try {
      const response = await axios.delete("/api/blog/delete-blog", {
        data: { id },
      });
      set({ blogs: blogs.filter((blog) => blog.id !== id) });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting blog:", error.message);
      toast.error("Failed to delete the blog");
    } finally {
      setLoading(false);
    }
  },
  getReviews: async () => {
    try {
      const response = await axios.get("/api/review/get-reviews");
      set({ reviews: response.data.reviews });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addReview: async (payload) => {
    const { reviews } = get();
    try {
      const response = await axios.post("/api/review/add-review", payload);
      set({ reviews: [...reviews, response.data.review] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  deleteReview: async (id) => {
    const { reviews, setLoading } = get();
    setLoading(true);
    try {
      const response = await axios.delete("/api/review/delete-review", {
        data: { id },
      });
      set({ reviews: reviews.filter((review) => review.id !== id) });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting Review:", error.message);
      toast.error("Failed to delete the Review");
    } finally {
      setLoading(false);
    }
  },
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
    const { portfolios, setLoading } = get();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  },
  reset: () => set({ blogs: [], reviews: [], portfolios: [] }),
}));

export default useHomeStore;
