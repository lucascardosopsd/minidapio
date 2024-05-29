"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/tools/formatPrice";
import { ItemProps } from "@/types/item";
import Image from "next/image";
import { CSSProperties, useState } from "react";

interface ItemCardProps {
  item: ItemProps;
  themeColor: string;
}

const ItemCard = ({ item, themeColor }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardStyles = { borderColor: themeColor };

  const hightLightStyles = {
    ...cardStyles,
    background: themeColor,
  } satisfies CSSProperties;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex justify-center items-center">
          <Image
            height={1000}
            width={1000}
            alt="Foto Produto"
            src={item.image}
            className="h-[90%] w-[90%] object-cover rounded rounded-r-none "
          />
        </DialogContent>
      </Dialog>

      <Card
        className="rounded border w-full"
        style={item.highlight ? hightLightStyles : cardStyles}
      >
        <CardContent className="flex items-center p-0 relative">
          <Image
            height={500}
            width={500}
            alt="Foto Produto"
            src={item.image}
            className="h-32 w-32 object-cover rounded rounded-r-none "
            onClick={() => setIsModalOpen(true)}
          />

          <div className={"flex flex-col px-4"}>
            <p
              className={cn("font-bold", item.highlight && "text-background")}
              style={{ color: !item.highlight ? themeColor : "" }}
            >
              {item.title}
            </p>
            <p className="text-xs">{item.description}</p>

            {item.sale ? (
              <>
                <p className="text-xs line-through">
                  {formatPrice(item.price, "pt-BR", "BRL")}
                </p>
                <p
                  className={cn("text-md", item.highlight && "text-background")}
                  style={{ color: !item.highlight ? themeColor : "" }}
                >
                  {formatPrice(item.salePrice!, "pt-BR", "BRL")}
                </p>
              </>
            ) : (
              <p className="font-bold" style={{ color: themeColor }}>
                {formatPrice(item.price, "pt-BR", "BRL")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
