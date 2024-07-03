"use client";
import CategoryCard from "../cards/Category";
import { CategoriesWithItemsProps } from "@/types/category";

interface CategoriesListProps {
  categories: CategoriesWithItemsProps[];
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto pb-16">
      {categories.map((category) => (
        <CategoryCard
          category={category}
          restaurantId={category.restaurantId!}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
