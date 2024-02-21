import { create } from "zustand";

interface ItemStoreProps {
  idList: string[];
  toggleId: (id: string) => void;
  setAllIds: (ids: string[]) => void;
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
