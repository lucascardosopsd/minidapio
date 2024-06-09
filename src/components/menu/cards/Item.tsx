"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/tools/formatPrice";
import { Item } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbStarFilled } from "react-icons/tb";

interface ItemCardProps {
  item: Item;
  themeColor: string;
  highlight?: boolean;
}

const ItemCard = ({ item, themeColor, highlight }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleSetFavorite = () => {
    if (localStorage.getItem("favorites")) {
      const favorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      ) as unknown as string[];

      const isFavorite = favorites?.includes(item.id);

      if (isFavorite) {
        const filter = favorites.filter((id) => id !== item.id);

        localStorage.setItem("favorites", JSON.stringify(filter));

        setFavorite(false);

        window.dispatchEvent(new Event("storage"));

        return;
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, item.id])
      );

      setFavorite(true);

      window.dispatchEvent(new Event("storage"));

      return;
    }

    localStorage.setItem("favorites", JSON.stringify([item.id]));

    window.dispatchEvent(new Event("storage"));

    setFavorite(true);
  };

  const handleCheckFavorite = () => {
    if (localStorage.getItem("favorites")) {
      const favorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      ) as unknown as string[];

      const isFavorite = favorites?.includes(item.id);
      setFavorite(isFavorite);
    }
  };

  useEffect(() => {
    handleCheckFavorite();

    window.addEventListener("storage", () => handleCheckFavorite());
  }, []);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex justify-center items-center p-0">
          <Image
            height={1000}
            width={1000}
            alt="Foto Produto"
            src={item.image}
            className="h-[90%] w-[90%] object-cover rounded rounded-r-none "
          />
        </DialogContent>
      </Dialog>

      <div
        className={
          "flex flex-1 gap-4 bg-card rounded border h-full min-h-36 relative"
        }
        style={{
          borderColor: highlight ? themeColor : "",
        }}
      >
        <div className="flex-1 max-h-full max-w-full rounded-l">
          <Image
            alt="Produto"
            src={item.image}
            height={500}
            width={500}
            className="h-full w-full object-cover rounded-l"
            onClick={() => setIsModalOpen(true)}
            priority
          />
        </div>

        <div className="flex flex-col justify-center gap-2 w-full pr-5 flex-[1.5]">
          {highlight && (
            <p className="text-xs text-muted-foreground">Destaque</p>
          )}
          <p className="font-semibold text-sm text-start text-foreground flex items-center gap-2">
            {item.title}
            <div
              onClick={handleSetFavorite}
              className={cn(
                "text-yellow-500 transition scale-100 flex justify-center",
                favorite && "scale-125"
              )}
            >
              <div className="self-end">
                {!favorite ? <Star size={16} /> : <TbStarFilled size={16} />}
              </div>
            </div>
          </p>
          <p className="text-xs text-start text-muted-foreground">
            {item.description}
          </p>

          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              {item.sale ? (
                <>
                  {item.price && (
                    <p className="text-xs line-through text-start">
                      {formatPrice(item?.price, "pt-BR", "BRL")}
                    </p>
                  )}
                  <p
                    className={cn(
                      "text-md text-start",
                      item.highlight && "text-background"
                    )}
                    style={{ color: !item.highlight ? themeColor : "" }}
                  >
                    {formatPrice(item.salePrice!, "pt-BR", "BRL")}
                  </p>
                </>
              ) : item?.price ? (
                <p
                  className="font-bold text-start"
                  style={{ color: themeColor }}
                >
                  {formatPrice(item?.price, "pt-BR", "BRL")}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
