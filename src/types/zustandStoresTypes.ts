declare global {
  type BlogStoreState = {
    blogs: string[];
    initilizeBlogStore: () => Promise<void>;
    addBlog: (payload: any) => Promise<void>;
    reset: () => void;
  };
}
export {};
