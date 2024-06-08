import { create } from "zustand";

interface CurrentCategoryProps {
  categoryId: string;
  setCategoryId: (id: string) => void;
}

export const currentCategoryStore = create<CurrentCategoryProps>((set) => ({
  categoryId: "",
  setCategoryId: (id) => set({ categoryId: id }),
}));
