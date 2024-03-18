import { ItemProps } from "@/types/item";
import { useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import ItemCard from "../cards/Item";
import { CategoriesWithItemsProps } from "@/types/category";

interface CategoryItemsListProps {
  originalItems: ItemProps[];
  categories: CategoriesWithItemsProps[];
}

const CategoryItemsList = ({
  originalItems,
  categories,
}: CategoryItemsListProps) => {
  const [newOrder, setNewOrder] = useState<ItemProps[]>(originalItems);
  const controls = useDragControls();

  useEffect(() => {
    setNewOrder(originalItems);
  }, [originalItems]);

  return (
    <>
      {newOrder
        .sort((itemA, itemB) => itemA.order - itemB.order)
        .map((item) => (
          <ItemCard
            categories={categories}
            item={item}
            restaurantId={item.restaurantId!}
            controls={controls}
          />
        ))}
    </>
  );
};

export default CategoryItemsList;
