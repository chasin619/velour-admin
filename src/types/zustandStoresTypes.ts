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
    getReviews: () => Promise<void>;
    addReview: (payload: any) => Promise<void>;
    getPortfolios: () => Promise<void>;
    addPortfolio: (payload: any) => Promise<void>;
    reset: () => void;
  };
}
export {};
