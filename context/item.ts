import { create } from "zustand";

interface ItemStoreProps {
  idList: number[];
  toggleId: (id: number) => void;
  setAllIds: (ids: number[]) => void;
}

export const useItemStore = create<ItemStoreProps>((set) => ({
  idList: [],

  setAllIds: (array) => set(() => ({ idList: array })),

  toggleId: (id) =>
    set((state) => ({
      idList: state.idList.includes(id)
        ? state.idList.filter((existingId) => existingId !== id)
        : [...state.idList, id],
    })),
}));
