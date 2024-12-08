import { create } from "zustand";

interface HomeStore {
  loading: boolean;
}

const initialValues: HomeStore = {
  loading: false,
};

const useConfigStore = create<ConfigStoreState>((set, get) => ({
  ...initialValues,
  setLoading: (loading) => {
    set({ loading });
  },
}));

export default useConfigStore;
