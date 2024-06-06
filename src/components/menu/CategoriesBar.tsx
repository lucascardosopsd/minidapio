"use client";

import { cn } from "@/lib/utils";
import { Category, Item } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryWithItemProps extends Category {
  items?: Item[];
}

interface CategoriesBarProps {
  categories: CategoryWithItemProps[];
  themeColor: string;
  currentCategoryId: string;
}

const CategoriesBar = ({
  categories,
  themeColor,
  currentCategoryId,
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
    <div
      className="flex gap-5 items-center overflow-x-auto w-[calc(100vw)] p-2 pr-10"
      style={{ background: themeColor }}
    >
      {categories.map((category) => (
        <span
          className={cn(
            "text-background font-medium cursor-pointer select-none transition bg-transparent",
            currentCategoryId == category.id &&
              "bg-background p-2 px-4 rounded-full"
          )}
          style={{
            color: currentCategoryId == category.id ? themeColor : "background",
          }}
          key={category.id}
          onClick={() => handleSetCategoryId(category.id)}
        >
          {category.title}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
