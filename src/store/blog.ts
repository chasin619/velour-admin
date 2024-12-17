import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { getHeaders } from "@/utils/helpers";

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
      const headers: any = getHeaders();
      const response = await axios.get("/api/blog/get-blogs", { ...headers });
      set({ blogs: response.data.blogs });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addBlog: async (payload) => {
    const { blogs } = get();
    try {
      const headers: any = getHeaders();
      const response = await axios.post("/api/blog/add-blog", payload, {
        ...headers,
      });
      set({ blogs: [response.data.blog, ...blogs] });
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
      set({ blogs: blogs.filter((blog) => blog._id !== id) });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting blog:", error.message);
      toast.error("Failed to delete the blog");
    }
  },
  editBlog: async (payload) => {
    const { blogs } = get();
    try {
      const response = await axios.put("/api/blog/edit-blog", payload);
      set({
        blogs: blogs.map((blog) =>
          blog.id === payload.id
            ? { ...blog, ...response.data.updatedBlog }
            : blog,
        ),
      });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error editing blog:", error.message);
      toast.error("Failed to edit the blog");
    }
  },
  reset: () => set({ blogs: [] }),
}));

export default useBlogStore;
