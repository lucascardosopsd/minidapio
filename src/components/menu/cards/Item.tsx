"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/tools/formatPrice";
import { Item } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface ItemCardProps {
  item: Item;
  themeColor: string;
}

const ItemCard = ({ item, themeColor }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <div className="flex gap-4 bg-card rounded border h-32">
        <Image
          alt="Produto"
          src={item.image}
          height={500}
          width={500}
          className="h-32 w-32 object-cover rounded-l"
        />

        <div className="flex flex-col justify-center gap-2">
          <p className="font-semibold">{item.title}</p>
          <p className="text-xs">{item.description}</p>
          {item.sale ? (
            <>
              {item.price && (
                <p className="text-xs line-through">
                  {formatPrice(item?.price, "pt-BR", "BRL")}
                </p>
              )}
              <p
                className={cn("text-md", item.highlight && "text-background")}
                style={{ color: !item.highlight ? themeColor : "" }}
              >
                {formatPrice(item.salePrice!, "pt-BR", "BRL")}
              </p>
            </>
          ) : item?.price ? (
            <p className="font-bold" style={{ color: themeColor }}>
              {formatPrice(item?.price, "pt-BR", "BRL")}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemCard;
