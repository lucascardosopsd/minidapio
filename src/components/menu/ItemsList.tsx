"use client";

import { Item } from "@prisma/client";
import ItemCard from "./cards/Item";
import { adStore } from "@/context/ads";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { createView } from "@/actions/createView";
import AdCard from "./cards/adCard";
import { pickAd } from "@/actions/pickAd";

interface ItemsListProps {
  items: Item[];
  themeColor: string;
  regionId: string;
}

const ItemsList = ({ items, themeColor, regionId }: ItemsListProps) => {
  const { currentAd, setCurrentAd } = adStore();

  console.log(currentAd);

  const adRef = useRef(null);
  const isAdInView = useInView(adRef, { once: true });

  const handlePickAd = async () => {
    const ad = await pickAd({
      regionId: regionId,
    });

    setCurrentAd(ad);
  };

  useEffect(() => {
    handlePickAd();
  }, []);

  const handleCreateView = () => {
    try {
      createView({
        restaurantId: items[0].restaurantId!,
        adId: currentAd?.id!,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentAd && isAdInView) return handleCreateView();
  }, [isAdInView]);

  return (
    <div className="flex flex-col gap-5">
      {items.slice((items.length / 2) * -1).map((item) => (
        <ItemCard item={item} themeColor={themeColor} key={item.id} />
      ))}

      {currentAd && (
        <span ref={adRef}>
          <AdCard ad={currentAd} />
        </span>
      )}

      {items.slice(items.length / 2).map((item) => (
        <ItemCard item={item} themeColor={themeColor} key={item.id} />
      ))}
    </div>
  );
};

export default ItemsList;
