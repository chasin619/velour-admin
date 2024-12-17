declare global {
  type ConfigStoreState = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
  };
  type BlogStoreState = {
    blogs: any[];
    getAllBlogs: () => Promise<void>;
    addBlog: (payload: any) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    editBlog: (payload: any) => Promise<void>;
  };
  type ReviewStoreState = {
    reviews: any[];
    getReviews: () => Promise<void>;
    addReview: (payload: any) => Promise<void>;
    deleteReview: (id: string) => Promise<void>;
  };
  type PortfolioStoreState = {
    portfolios: any[];
    getPortfolios: () => Promise<void>;
    addPortfolio: (payload: any) => Promise<void>;
    deletePortfolio: (id: string) => Promise<void>;
  };
  type AuthStateStore = {
    user: any;
    accessToken: string | null;
    login: (payload: any) => Promise<void>;
    logout: () => void;
    reset: () => void;
  };
}
export {};
