import { CategoriesWithItemsProps } from "@/types/category";
import ItemCard from "./cards/Item";
import { Separator } from "../ui/separator";

interface CategoryListProps {
  category: CategoriesWithItemsProps;
  themeColor: string;
}

const CategoryList = ({ category, themeColor }: CategoryListProps) => {
  return (
    <div key={category.id}>
      {/* Category Header */}
      <div className="flex items-center justify-center w-full p-5 border border-border rounded-lg bg-background/50 backdrop-blur-md sticky top-0 dark:bg-gradient-to-tl from-zinc-900/50 to-transparent z-50">
        <p>{category.title}</p>
      </div>

      {/* Category Items */}
      <div className="flex flex-col gap-2 mt-2 px-2">
        {category?.items?.map((item) => (
          <ItemCard
            item={item}
            themeColor={themeColor}
            highlight={item.highlight}
            key={item.id}
          />
        ))}
      </div>

      <Separator className="mt-2 opacity-25" />
    </div>
  );
};

export default CategoryList;
