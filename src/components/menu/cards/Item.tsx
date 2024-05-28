"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/tools/formatPrice";
import { ItemProps } from "@/types/item";
import { Star } from "lucide-react";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";

interface ItemCardProps {
  item: ItemProps;
  themeColor: string;
}

const ItemCard = ({ item, themeColor }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cardStyles = { borderColor: themeColor };

  const hightLightStyles = {
    ...cardStyles,
    background: themeColor,
  } satisfies CSSProperties;

  useEffect(() => {
    if (localStorage.getItem("favorites")) {
      const favorites: string[] = JSON.parse(
        localStorage.getItem("favorites") || ""
      );

      const checkFavorite = favorites.some((favorite) => favorite == item.id);

      if (checkFavorite) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [localStorage.getItem("favorites")]);

  const handleToggleFavorite = () => {
    if (localStorage.getItem("favorites") !== null) {
      let favorites: string[] = JSON.parse(
        localStorage.getItem("favorites") || ""
      );

      const checkFavorite = favorites.some((favorite) => favorite == item.id);

      if (!checkFavorite) {
        favorites.push(item.id);

        setIsFavorite(true);

        return localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      const index = favorites.findIndex((favorite) => favorite == item.id);

      favorites.splice(index, 1);

      setIsFavorite(false);

      return localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    let favorites = [item.id];

    setIsFavorite(true);

    return localStorage.setItem("favorites", JSON.stringify(favorites));
  };

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
          <Star
            strokeWidth={1}
            className="absolute right-5 top-5 text-yellow-500 cursor-pointer transition"
            fill={isFavorite ? "#eab308" : "transparent"}
            onClick={handleToggleFavorite}
          />

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
