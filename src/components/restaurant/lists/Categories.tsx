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
      {categories.length ? (
        <div className="flex flex-col gap-2">
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
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[65svh]">
          <p>Você não tem categorias criadas.</p>
          <div className="flex">
            <p>👆 Crie categorias clicando em </p>
            <p className="text-primary ml-1">"Adicionar +"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
