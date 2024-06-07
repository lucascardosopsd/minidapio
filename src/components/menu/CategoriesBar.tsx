"use client";
import { cn } from "@/lib/utils";
import { Category, Item } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

interface CategoryWithItemProps extends Category {
  items?: Item[];
}

interface CategoriesBarProps {
  categories: CategoryWithItemProps[];
  themeColor: string;
  currentCategoryId: string;
  initialIndex?: number;
}

const CategoriesBar = ({
  categories,
  themeColor,
  currentCategoryId,
  initialIndex = 0,
}: CategoriesBarProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSetCategoryId = (id: string) => {
    params.set("categoryId", id);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Swiper
      slidesPerView={2}
      initialSlide={initialIndex}
      style={{
        background: themeColor,
        height: "50px",
        padding: "5px",
      }}
    >
      <SwiperSlide key="highlights">
        <div
          className={cn(
            "text-background font-medium cursor-pointer select-none transition bg-transparent text-sm flex items-center justify-center h-full",
            currentCategoryId == "highlights" &&
              "bg-background p-2 px-4 rounded-lg"
          )}
          style={{
            color:
              currentCategoryId == "highlights" ? themeColor : "background",
          }}
          onClick={() => handleSetCategoryId("highlights")}
        >
          Destaques
        </div>
      </SwiperSlide>

      {categories.map((category) => (
        <SwiperSlide key={category.id}>
          <div
            className={cn(
              "text-background cursor-pointer select-none transition bg-transparent text-center text-sm flex items-center justify-center h-full mx-5 leading-[12px] font-semibold",
              currentCategoryId == category.id &&
                "bg-background p-2 px-4 rounded-lg"
            )}
            style={{
              color:
                currentCategoryId == category.id ? themeColor : "background",
            }}
            onClick={() => handleSetCategoryId(category.id)}
          >
            {category.title}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesBar;
