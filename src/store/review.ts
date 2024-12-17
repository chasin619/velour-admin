import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { getHeaders } from "@/utils/helpers";

interface ReviewStore {
  reviews: any[];
}

const initialValues: ReviewStore = {
  reviews: [],
};

const useReviewStore = create<ReviewStoreState>((set, get) => ({
  ...initialValues,
  getReviews: async () => {
    try {
      const headers: any = getHeaders();
      const response = await axios.get("/api/review/get-reviews", {
        ...headers,
      });
      set({ reviews: response.data.reviews });
    } catch (error: any) {
      console.log(error.message);
    }
  },
  addReview: async (payload) => {
    const { reviews } = get();
    try {
      const headers: any = getHeaders();
      const response = await axios.post("/api/review/add-review", payload, {
        ...headers,
      });
      set({ reviews: [response.data.review, ...reviews] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  deleteReview: async (id) => {
    const { reviews } = get();
    try {
      const response = await axios.delete("/api/review/delete-review", {
        data: { id },
      });
      set({ reviews: reviews.filter((review) => review._id !== id) });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting Review:", error.message);
      toast.error("Failed to delete the Review");
    }
  },
  reset: () => set({ reviews: [] }),
}));

export default useReviewStore;
