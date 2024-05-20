import { ItemProps } from "@/types/item";
import ItemCard from "../../cards/Item";

interface CategoryItemsContentProps {
  items: ItemProps[];
  themeColor: string;
}

const CategoryItemsContent = ({
  items,
  themeColor,
}: CategoryItemsContentProps) => {
  return (
    <div className="flex gap-5 flex-col relative pb-10 overflow-y-auto">
      {items.map((item) => (
        <ItemCard item={item} themeColor={themeColor} />
      ))}
    </div>
  );
};

export default CategoryItemsContent;
