import { Ad } from "@prisma/client";
import { create } from "zustand";

interface AdsStoreProps {
  currentAd: Ad | null;
  setCurrentAd: (ad: Ad) => void;
}

export const adStore = create<AdsStoreProps>((set) => ({
  currentAd: null,
  setCurrentAd: (ad) => set({ currentAd: ad }),
}));
