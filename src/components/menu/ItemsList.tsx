"use client";
import { Item } from "@prisma/client";
import ItemCard from "./cards/Item";
import { AnimatePresence, motion } from "framer-motion";
import { currentCategoryStore } from "@/context/currentCategory";

interface ItemsListProps {
  items: Item[];
  themeColor: string;
}

const ItemsList = ({ items, themeColor }: ItemsListProps) => {
  const { categoryId } = currentCategoryStore();

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
      </div>
    </AnimatePresence>
  );
};

export default ItemsList;
