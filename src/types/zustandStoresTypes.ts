declare global {
  type BlogStoreState = {
    blogs: any[];
    reviews: any[];
    initilizeHomeStore: () => Promise<void>;
    getAllBlogs: () => Promise<void>;
    addBlog: (payload: any) => Promise<void>;
    getReviews: () => Promise<void>;
    reset: () => void;
  };
}
export {};
