import { create } from "zustand";

interface RestaurantMenuStoreProps {
  currentCategory: number;
  setCurrentCategory: (id: number) => void;
}

export const useRestaurantStore = create<RestaurantMenuStoreProps>((set) => ({
  currentCategory: 1,
  setCurrentCategory: (id) => set({ currentCategory: id }),
}));
