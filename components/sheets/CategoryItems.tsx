import { CSSProperties, ReactNode, useState } from "react";
import { Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import { ButtonVariants } from "@/types/button";
import { CustomSheetContent } from "../ui/customSheetContent";
import { items } from "@/mock/items";
import { Card, CardContent } from "../ui/card";
import { FaChevronLeft } from "react-icons/fa6";
import { useRestaurantStore } from "@/context/restaurantMenu";
import { formatPrice } from "@/tools/formatPrice";
import Image from "next/image";
import { categories } from "@/mock/categories";

interface CategoryItemsSheetProps {
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  triggerClassname?: string;
  triggerStyle?: CSSProperties;
  themeColor: string;
}

const CategoryItemsSheet = ({
  triggerText,
  triggerVariant,
  triggerClassname,
  themeColor,
  triggerStyle,
}: CategoryItemsSheetProps) => {
  const [open, setOpen] = useState(false);
  const { currentCategory } = useRestaurantStore();

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant={triggerVariant}
        className={triggerClassname}
        onClick={toggleOpen}
        style={triggerStyle}
      >
        {triggerText}
      </Button>
      <CustomSheetContent
        side="right"
        className="w-svw h-[100svh] overflow-y-auto"
        contentTitle={
          <div className="text-muted-foreground text-xs gap-1 flex">
            <p>Inicio / Menu /</p>
            <p style={{ color: themeColor }}>
              {
                categories.filter(
                  (category) => category.id == currentCategory
                )[0].title
              }
            </p>
          </div>
        }
        closeIcon={<FaChevronLeft style={{ color: themeColor }} size={21} />}
      >
        <div className="flex gap-5 flex-col mt-5 relative pb-10">
          <div className="fixed w-full h-20 bottom-0 left-0 bg-gradient-to-t from-background to-transparent cursor-none pointer-events-none" />

          {items
            .filter(
              (item) => item.categoryId == currentCategory && item.highlight
            )
            .map((item) => (
              <Card
                className="rounded border"
                style={{ borderColor: themeColor, background: themeColor }}
              >
                <CardContent className="flex-col items-center p-0">
                  <Image
                    height={0}
                    width={0}
                    alt="Foto Produto"
                    src={item.image}
                    sizes="1000px"
                    className="h-full w-full object-cover rounded-t-md flex-1"
                  />

                  <div className="flex flex-col justify-center p-4">
                    <p className="text-xs text-background font-semibold">
                      Destaque
                    </p>
                    <p className="text-background font-bold">{item.title}</p>
                    <p className="text-xs">{item.description}</p>
                    <p className="text-background font-semibold">
                      {formatPrice(item.price, "pt-BR", "BRL")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

          {items
            .filter(
              (item) => item.categoryId == currentCategory && !item.highlight
            )
            .map((item) => (
              <Card
                className="rounded border"
                style={{ borderColor: themeColor }}
              >
                <CardContent className="flex-col items-center p-0">
                  <Image
                    height={0}
                    width={0}
                    alt="Foto Produto"
                    src={item.image}
                    sizes="1000px"
                    className="h-full w-full object-cover rounded-t-md flex-1"
                  />

                  <div className="flex flex-col justify-center p-4">
                    <p className="text-xs text-background font-semibold">
                      Destaque
                    </p>
                    <p className="font-bold" style={{ color: themeColor }}>
                      {item.title}
                    </p>
                    <p className="text-xs">{item.description}</p>

                    {item.sale ? (
                      <>
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.price, "pt-BR", "BRL")}
                        </p>
                        <p className="text-md" style={{ color: themeColor }}>
                          {formatPrice(item.salePrice!, "pt-BR", "BRL")}
                        </p>
                      </>
                    ) : (
                      <p
                        className="font-semibold"
                        style={{ color: themeColor }}
                      >
                        {formatPrice(item.price, "pt-BR", "BRL")}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </CustomSheetContent>
    </Sheet>
  );
};

export default CategoryItemsSheet;
