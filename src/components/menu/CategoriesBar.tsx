"use client";
import { currentCategoryStore } from "@/context/currentCategory";
import { cn } from "@/lib/utils";
import { Category, Item } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface CategoryWithItemProps extends Category {
  items?: Item[];
}

interface CategoriesBarProps {
  categories: CategoryWithItemProps[];
  themeColor: string;
}

const CategoriesBar = ({ categories, themeColor }: CategoriesBarProps) => {
  const { categoryId, setCategoryId } = currentCategoryStore();

  const handleSetCategoryId = (id: string) => {
    setCategoryId(id);
  };

  useEffect(() => {
    setCategoryId(categories[0].id);
  }, []);

  return (
    <div className="relative">
      <div className="absolute w-full h-full flex items-center left-0 top-0 justify-between z-50 pointer-events-none text-background">
        <div className="flex items-center h-full flex-1">
          <ChevronLeft />
        </div>

        <div className="flex-[2]" />

        <div className="flex items-center h-full flex-1 justify-end">
          <ChevronRight />
        </div>
      </div>

      <Swiper
        slidesPerView={2}
        style={{
          background: themeColor,
          height: "50px",
          padding: "5px",
          paddingLeft: "50px",
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div
              className={cn(
                "text-background cursor-pointer select-none transition bg-transparent text-center text-sm flex items-center justify-center h-full mx-5 leading-[12px] font-semibold whitespace-nowrap",
                categoryId == category.id && "bg-background p-2 px-4 rounded-lg"
              )}
              style={{
                color: categoryId == category.id ? themeColor : "background",
              }}
              onClick={() => handleSetCategoryId(category.id)}
            >
              {category.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesBar;
