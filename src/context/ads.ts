import { AdProps } from "@/types/ad";
import { create } from "zustand";

interface AdsStoreProps {
  currentAd: AdProps | null;
  setCurrentAd: (ad: AdProps) => void;
}

export const adStore = create<AdsStoreProps>((set) => ({
  currentAd: null,
  setCurrentAd: (ad) => set({ currentAd: ad }),
}));
