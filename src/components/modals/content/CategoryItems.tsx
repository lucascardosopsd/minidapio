import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/tools/formatPrice";
import { ItemProps } from "@/types/item";
import Image from "next/image";

interface CategoryItemsContentProps {
  items: ItemProps[];
  themeColor: string;
}

const CategoryItemsContent = ({
  items,
  themeColor,
}: CategoryItemsContentProps) => {
  return (
    <div className="flex gap-5 flex-col relative pb-10 overflow-y-auto">
      {items
        .filter((item) => item.highlight)
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
        .filter((item) => !item.highlight)
        .map((item) => (
          <Card className="rounded border" style={{ borderColor: themeColor }}>
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
                  <p className="font-semibold" style={{ color: themeColor }}>
                    {formatPrice(item.price, "pt-BR", "BRL")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default CategoryItemsContent;
