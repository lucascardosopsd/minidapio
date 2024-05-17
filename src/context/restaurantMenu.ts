import { create } from "zustand";

interface RestaurantMenuStoreProps {
  currentCategory: string;
  setCurrentCategory: (id: string) => void;
}

export const useRestaurantStore = create<RestaurantMenuStoreProps>((set) => ({
  currentCategory: "",
  setCurrentCategory: (id) => set({ currentCategory: id }),
}));
