declare global {
  type HomeStoreState = {
    blogs: any[];
    reviews: any[];
    portfolios: any[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    initilizeHomeStore: () => Promise<void>;
    getAllBlogs: () => Promise<void>;
    addBlog: (payload: any) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    getReviews: () => Promise<void>;
    addReview: (payload: any) => Promise<void>;
    deleteReview: (id: string) => Promise<void>;
    getPortfolios: () => Promise<void>;
    addPortfolio: (payload: any) => Promise<void>;
    reset: () => void;
  };
  type AuthStateStore = {
    accessToken: string | null;
    login: (payload: any) => Promise<void>;
    logout: () => void;
    reset: () => void;
  };
}
export {};
