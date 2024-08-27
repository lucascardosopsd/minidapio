"use client";
import { PlanLimitProps } from "@/constants/planLimits";
import CategoryCard from "../cards/Category";
import { CategoriesWithItemsProps } from "@/types/category";

interface CategoriesListProps {
  categories: CategoriesWithItemsProps[];
  limits: PlanLimitProps;
}

const CategoriesList = ({ categories, limits }: CategoriesListProps) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto pb-16">
      {categories.map((category) => (
        <CategoryCard
          category={category}
          restaurantId={category.restaurantId!}
          categories={categories}
          key={category.id}
          limits={limits}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
