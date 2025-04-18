"use client";
import { useItemStore } from "@/context/item";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "../ui/separator";
import TransferItemsDialog from "./dialogs/TransferItems";
import { CategoriesWithItemsProps } from "@/types/category";
import { Checkbox } from "../ui/checkbox";
import DeleteItemsDialog from "./dialogs/DeleteItems";
import DuplicateItemsDialog from "./dialogs/DuplicateItems";
import { MenuItem } from "@prisma/client";

interface ItemsActionsProps {
  items: MenuItem[];
  categories: CategoriesWithItemsProps[];
  visible?: boolean;
}

const ItemsActions = ({
  items,
  categories,
  visible = false,
}: ItemsActionsProps) => {
  const { idList, setAllIds } = useItemStore();
  const itemIds = items.map((item) => item.id);

  return (
    <AnimatePresence>
      {(visible || idList.length >= 1) && (
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

            <DuplicateItemsDialog />

            <DeleteItemsDialog />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemsActions;
