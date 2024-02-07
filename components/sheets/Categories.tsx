import { CSSProperties, ReactNode, useState } from "react";
import { Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import { ButtonVariants } from "@/types/button";
import { CustomSheetContent } from "../ui/customSheetContent";
import { Input } from "../ui/input";
import { items } from "@/mock/items";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { formatPrice } from "@/tools/formatPrice";
import { categories } from "@/mock/categories";
import { Separator } from "../ui/separator";
import CategoryItemsSheet from "./CategoryItems";

interface CategoriesSheetProps {
  triggerText: string | ReactNode;
  triggerVariant: ButtonVariants;
  triggerClassname?: string;
  triggerStyle?: CSSProperties;
  themeColor: string;
  restaurantId: number;
}

const CategoriesSheet = ({
  triggerText,
  triggerVariant,
  triggerClassname,
  themeColor,
  restaurantId,
  triggerStyle,
}: CategoriesSheetProps) => {
  const [open, setOpen] = useState(false);

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
          <p className="text-muted-foreground text-xs">Inicio / Menu</p>
        }
        closeIcon={<FaChevronLeft style={{ color: themeColor }} size={21} />}
      >
        <div className="h-full flex flex-col mt-5 gap-5 relative">
          <div className="fixed w-full h-20 bottom-0 left-0 bg-gradient-to-t from-background to-transparent z-10 cursor-none pointer-events-none" />

          <div className="flex">
            <Input
              className="rounded-r-none border-r-0 placeholder:text-muted-foreground"
              placeholder="Buscar item"
              style={{ borderColor: themeColor }}
            />
            <div
              className="flex items-center justify-center rounded border border-border w-10 h-10 rounded-l-none border-l-0 text-muted-foreground"
              style={{ borderColor: themeColor }}
            >
              <IoIosSearch size={24} />
            </div>
          </div>

          <div className="flex gap-5 w-[calc(90svw)] min-h-[calc(70svh)] overflow-x-auto">
            {items
              .filter((item) => item.restaurantId == restaurantId && item.sale)
              .map((item) => (
                <Card style={{ borderColor: themeColor }}>
                  <CardContent className="aspect-square flex-1 p-0 w-[80svw] h-[30svh] relative">
                    <Image
                      height={0}
                      width={0}
                      alt="Foto Produto"
                      src={item.image}
                      sizes="1000px"
                      className="h-full w-full object-cover rounded-t-md"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-background to-transparent" />
                  </CardContent>
                  <CardFooter className="flex-1 pt-5 ">
                    <div className="flex flex-col">
                      <p className="text-xs" style={{ color: themeColor }}>
                        Promoção
                      </p>
                      <p className="text-md" style={{ color: themeColor }}>
                        {item.title}
                      </p>
                      <p className="text-xs">{item.description}</p>

                      <p className="text-xs text-muted-foreground line-through">
                        {formatPrice(item.price, "pt-BR", "BRL")}
                      </p>
                      <p className="text-md" style={{ color: themeColor }}>
                        {formatPrice(item.salePrice!, "pt-BR", "BRL")}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>

          <div className="flex flex-col gap-5 pb-5">
            {categories
              .filter((category) => category.restaurantId == restaurantId)
              .map((category) => (
                <div
                  className="flex items-center justify-between border rounded text-sm relative"
                  style={{ borderColor: themeColor }}
                >
                  <div
                    className="rounded-full flex items-center justify-center absolute -right-2 -top-2 w-6 h-6 text-sm "
                    style={{ background: themeColor }}
                  >
                    {
                      categories.filter(
                        (category) => category.restaurantId == restaurantId
                      ).length
                    }
                  </div>

                  <p className="flex-[2] p-4">{category.title}</p>

                  <Separator
                    orientation="vertical"
                    style={{ background: themeColor }}
                  />

                  <CategoryItemsSheet
                    themeColor={themeColor}
                    triggerText="Abrir"
                    triggerVariant="outline"
                    triggerClassname="flex-1 h-full border-0"
                  />
                </div>
              ))}
          </div>
        </div>
      </CustomSheetContent>
    </Sheet>
  );
};

export default CategoriesSheet;
