import { StateStorage } from "zustand/middleware";

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return localStorage.setItem(name, value);
  },
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return localStorage.removeItem(name);
  },
};
