import { ItemProps } from "@/types/item";
import ItemCard from "../../cards/Item";
import { adStore } from "@/context/ads";
import AdCard from "../../cards/adCard";

interface CategoryItemsContentProps {
  items: ItemProps[];
  themeColor: string;
}

const CategoryItemsContent = ({
  items,
  themeColor,
}: CategoryItemsContentProps) => {
  const { currentAd } = adStore();

  return (
    <div className="flex gap-5 flex-col relative pb-10 overflow-y-auto">
      {items.slice((items.length / 2) * -1).map((item) => (
        <ItemCard item={item} themeColor={themeColor} />
      ))}

      {currentAd && <AdCard ad={currentAd} />}

      {items.slice(items.length / 2).map((item) => (
        <ItemCard item={item} themeColor={themeColor} />
      ))}
    </div>
  );
};

export default CategoryItemsContent;
