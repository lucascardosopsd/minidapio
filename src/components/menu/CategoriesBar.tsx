"use client";
import { currentCategoryStore } from "@/context/currentCategory";
import { cn } from "@/lib/utils";
import { Category, Item } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface CategoryWithItemProps extends Category {
  items?: Item[];
}

interface CategoriesBarProps {
  categories: CategoryWithItemProps[];
  themeColor: string;
}

const CategoriesBar = ({ categories, themeColor }: CategoriesBarProps) => {
  const { categoryId, setCategoryId } = currentCategoryStore();
  const swiperRef = useRef<SwiperClass | null>(null);

  const handleSetCategoryId = (id: string) => {
    setCategoryId(id);
  };

  useEffect(() => {
    setCategoryId(categories[0].id);
  }, []);

  return (
    <div className="relative">
      <div className="absolute w-full h-full flex items-center left-0 top-0 justify-between z-50 text-background pointer-events-none">
        <div
          className="flex items-center h-full w-8 bg-gradient-to-r from-background via-background to-transparent pointer-events-auto"
          onClick={() => swiperRef?.current?.slidePrev()}
          style={{
            color: themeColor,
          }}
        >
          <ChevronLeft />
        </div>

        <div
          className="flex items-center h-full w-8 justify-end pointer-events-auto bg-gradient-to-l from-background via-background to-transparent"
          onClick={() => swiperRef?.current?.slideNext()}
          style={{
            color: themeColor,
          }}
        >
          <ChevronRight />
        </div>
      </div>

      <Swiper
        style={{
          color: themeColor,
          height: "50px",
          padding: "5px",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
        spaceBetween={10}
        slidesPerView={2}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div
              className={cn(
                "cursor-pointer select-none transition bg-transparent text-center text-sm flex items-center justify-center h-full leading-[12px] font-semibold whitespace-nowrap",
                categoryId == category.id && "p-2  rounded-lg"
              )}
              style={{
                color: categoryId == category.id ? "background" : themeColor,
                background: categoryId == category.id ? themeColor : "",
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
