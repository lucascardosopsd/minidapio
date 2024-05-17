"use client";
import { Reorder, useDragControls } from "framer-motion";
import CategoryCard from "../cards/Category";
import { CategoriesWithItemsProps } from "@/types/category";
import { useEffect, useState } from "react";

import debounce, { DebouncedFunction } from "debounce";
import { updateCategory } from "@/actions/category/updateCategory";
import { toast } from "sonner";

interface CategoriesListProps {
  categories: CategoriesWithItemsProps[];
}

const CategoriesList = ({
  categories: originalCategories,
}: CategoriesListProps) => {
  const [newOrder, setNewOrder] = useState<CategoriesWithItemsProps[]>([]);
  const controls = useDragControls();

  useEffect(() => {
    setNewOrder(originalCategories);
  }, [originalCategories]);

  const handleNewOrderToDb = async () => {
    try {
      // Check if order realy changes
      for (const categoryOrder of newOrder) {
        for (const originalCategory of originalCategories) {
          await updateCategory(
            {
              order: newOrder
                .map((category) => category.id)
                .indexOf(originalCategory.id),
            },
            categoryOrder.id
          );
        }
      }
    } catch (error) {
      toast.warning("Ocorreu um erro");
      throw new Error("Error while record new order in database");
    }
  };

  const newOrderToDbDebounce: DebouncedFunction<any> = debounce(
    handleNewOrderToDb,
    3000
  );

  const handleReorder = (order: CategoriesWithItemsProps[]) => {
    setNewOrder(order);

    newOrderToDbDebounce.clear();

    newOrderToDbDebounce();
  };

  return (
    <Reorder.Group
      axis="y"
      values={newOrder}
      onReorder={handleReorder}
      className="space-y-2 pb-10"
      draggable={false}
    >
      {newOrder
        .sort((categoryA, categoryB) => categoryA.order! - categoryB.order!)
        .map((category) => (
          <CategoryCard
            category={category}
            restaurantId={category.restaurantId!}
            categories={newOrder}
            controls={controls}
          />
        ))}
    </Reorder.Group>
  );
};

export default CategoriesList;
