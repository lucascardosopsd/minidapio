import { Category, Item } from "@prisma/client";

export interface CategoriesWithItemsProps extends Category {
  items?: Item[];
}
