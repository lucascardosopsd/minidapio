"use client";
import { Item } from "@prisma/client";
import ItemCard from "./cards/Item";
import { adStore } from "@/context/ads";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createView } from "@/actions/createView";
import AdCard from "./cards/adCard";
import { currentCategoryStore } from "@/context/currentCategory";
import { pickAd } from "@/actions/ad/pickAd";

interface ItemsListProps {
  items: Item[];
  themeColor: string;
  regionId: string;
  restaurantId: string;
}

const ItemsList = ({
  items,
  themeColor,
  regionId,
  restaurantId,
}: ItemsListProps) => {
  const { currentAd, setCurrentAd } = adStore();
  const { categoryId } = currentCategoryStore();
  const [adOrder, setAdOrder] = useState(0);

  const adRef = useRef(null);

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
        restaurantId: restaurantId,
        adId: currentAd?.id!,
      });

      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          handleCreateView();
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current);
      }
    };
  }, [currentAd]);

  useEffect(() => {
    const length = items.filter((item) => item.categoryId == categoryId).length;

    const randomNum = Math.floor(Math.random() * (length - 0 + 1) + 0);

    setAdOrder(randomNum);
  }, [categoryId]);

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-5">
        {items
          .filter((item) => item.categoryId == categoryId)
          .sort((a, b) => Number(b.highlight) - Number(a.highlight))
          .map((item, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                order: index,
              }}
            >
              <span>
                <ItemCard
                  item={item}
                  themeColor={themeColor}
                  key={item.id}
                  highlight={item.highlight}
                />
              </span>
            </motion.div>
          ))}

        {currentAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              order: adOrder,
            }}
          >
            <span ref={adRef} key={adOrder + currentAd.title}>
              <AdCard ad={currentAd} />
            </span>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default ItemsList;
