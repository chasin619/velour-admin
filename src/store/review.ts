import { create } from "zustand";
import toast from "react-hot-toast";
import api from "@/utils/api";

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
      const response = await api.get("/review");
      set({ reviews: response.data.reviews });
    } catch (error: any) {
      console.error("Error getting reviews:", error.message);
      toast.error("Failed to fetch reviews");
    }
  },
  addReview: async (payload) => {
    const { reviews } = get();
    try {
      const response = await api.post("/review", payload);
      set({ reviews: [response.data.review, ...reviews] });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error adding review:", error.message);
      toast.error("Failed to add review");
    }
  },
  deleteReview: async (id) => {
    const { reviews } = get();
    try {
      const response = await api.delete("/review", {
        data: { id },
      });
      set({ reviews: reviews.filter((review) => review._id !== id) });
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error deleting review:", error.message);
      toast.error("Failed to delete review");
    }
  },
  reset: () => set({ reviews: [] }),
}));

export default useReviewStore;
