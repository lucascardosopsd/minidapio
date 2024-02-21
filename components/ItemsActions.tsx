"use client";

import { useItemStore } from "@/context/item";
import { ItemProps } from "@/types/item";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "./ui/separator";
import TransferItemsDialog from "./dialogs/TransferItems";
import { CategoriesWithItemsProps } from "@/types/category";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface ItemsActionsProps {
  items: ItemProps[];
  categories: CategoriesWithItemsProps[];
}

const ItemsActions = ({ items, categories }: ItemsActionsProps) => {
  const { idList, setAllIds } = useItemStore();
  const itemIds = items.map((item) => item.id);

  return (
    <AnimatePresence>
      {idList.length >= 1 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="flex gap-4 px-3">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={idList.length == itemIds.length}
                onClick={() => {
                  idList.length !== itemIds.length
                    ? setAllIds(itemIds)
                    : setAllIds([]);
                }}
              />

              <p className="text-mutted">Todos</p>

              <Separator orientation="vertical" />
            </div>

            <TransferItemsDialog categories={categories} />

            <Button size="sm">Duplicar</Button>

            <Button size="sm" variant="destructive">
              Apagar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemsActions;
