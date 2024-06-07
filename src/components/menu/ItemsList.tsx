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

  const middleIndex = Math.ceil(items.length / 2);

  return (
    <div className="flex flex-col gap-5">
      {items.slice(0, middleIndex).map((item) => (
        <ItemCard item={item} themeColor={themeColor} key={item.id} />
      ))}

      {currentAd && (
        <span ref={adRef}>
          <AdCard ad={currentAd} />
        </span>
      )}

      {items.slice(middleIndex).map((item) => (
        <ItemCard item={item} themeColor={themeColor} key={item.id} />
      ))}
    </div>
  );
};

export default ItemsList;
