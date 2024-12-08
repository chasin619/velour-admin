import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface BlogStore {
  blogs: any[];
}

const initialValues: BlogStore = {
  blogs: [],
};

const useBlogStore = create<BlogStoreState>((set, get) => ({
  ...initialValues,
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
    const { blogs } = get();
    try {
      const response = await axios.delete("/api/blog/delete-blog", {
        data: { id },
      });
      set({ blogs: blogs.filter((blog) => blog.id !== id) });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting blog:", error.message);
      toast.error("Failed to delete the blog");
    }
  },
  reset: () => set({ blogs: [] }),
}));

export default useBlogStore;
