import { ItemProps } from "@/types/item";
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

  useEffect(() => {
    setNewOrder(originalItems);
  }, [originalItems]);

  return (
    <>
      {newOrder
        .sort((itemA, itemB) => itemA.order! - itemB.order!)
        .map((item) => (
          <ItemCard
            categories={categories}
            item={item}
            restaurantId={item.restaurantId!}
          />
        ))}
    </>
  );
};

export default CategoryItemsList;
