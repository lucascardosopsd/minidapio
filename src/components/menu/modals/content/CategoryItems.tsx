import { ItemProps } from "@/types/item";
import ItemCard from "../../cards/Item";
import { adStore } from "@/context/ads";
import AdCard from "../../cards/adCard";
import { createView } from "@/actions/createView";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface CategoryItemsContentProps {
  items: ItemProps[];
  themeColor: string;
  restaurantId: string;
}

const CategoryItemsContent = ({
  items,
  themeColor,
  restaurantId,
}: CategoryItemsContentProps) => {
  const { currentAd } = adStore();

  const adRef = useRef(null);
  const isAdInView = useInView(adRef, { once: true });

  const handleCreateView = () => {
    try {
      createView({ restaurantId, adId: currentAd?.id! });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(isAdInView);
    if (currentAd && isAdInView) return handleCreateView();
  }, [isAdInView]);

  return (
    <div className="flex gap-5 flex-col relative pb-10 overflow-y-auto">
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

export default CategoryItemsContent;
