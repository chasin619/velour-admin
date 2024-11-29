import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface BlogStore {
  blogs: any[];
  reviews: any[];
}

const initialValues: BlogStore = {
  blogs: [],
  reviews: [],
};

const useHomeStore = create<BlogStoreState>((set, get) => ({
  ...initialValues,
  initilizeHomeStore: async () => {
    const { getAllBlogs, getReviews } = get();
    await getAllBlogs();
    await getReviews();
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
    try {
      const response = await axios.post("/api/addBlog", payload);
      set({ blogs: response.data.blogs });
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
  reset: () => set({ blogs: [], reviews: [] }),
}));

export default useHomeStore;
