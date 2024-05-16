import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/tools/formatPrice";
import { CategoryProps } from "@/types/category";
import { ItemProps } from "@/types/item";
import Image from "next/image";
import CategoryItemsSheet from "../CategoryItems";

interface CategoriesModalContentProps {
  items: ItemProps[];
  categories: CategoryProps[];
  themeColor: string;
}

const CategoriesModalContent = ({
  items,
  categories,
  themeColor,
}: CategoriesModalContentProps) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden flex flex-col mt-5 relative gap-4 ">
      <div className="flex items-center gap-5 overflow-x-auto">
        {items?.length &&
          items
            .filter((item: ItemProps) => item.highlight)
            .map((item) => (
              <Card style={{ borderColor: themeColor }} key={item.id}>
                <CardContent className="aspect-square flex-1 p-0 w-[75svw] h-[30svh] relative">
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

      <div className="flex flex-col gap-5 pb-10">
        {categories &&
          categories.map((category) => (
            <div
              className="flex items-center justify-between border rounded text-sm relative"
              style={{ borderColor: themeColor }}
              key={category.id}
            >
              <CategoryItemsSheet
                themeColor={themeColor}
                triggerText={category.title}
                triggerVariant="outline"
                triggerClassname="flex-1 h-full border-0 py-4 justify-start"
                items={items}
                triggerStyle={{ color: themeColor }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesModalContent;
