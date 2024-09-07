import { BsBookmarkStarFill } from "react-icons/bs";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Item } from "@prisma/client";
import { useEffect, useState } from "react";
import ItemCard from "./cards/Item";

interface FavoritesModalProps {
  items: Item[];
  themeColor: string;
}

const FavoritesModal = ({ items, themeColor }: FavoritesModalProps) => {
  const [favoriteList, setFavoriteList] = useState<Item[]>([] as Item[]);

  const handleFetchFavorites = () => {
    if (localStorage) {
      const favoriteIds = new Set(
        JSON.parse(localStorage.getItem("favorites") || "[]")
      );

      // Remove items
      const updatedFavoriteList = favoriteList.filter(
        (fav) => !favoriteIds.has(fav.id)
      );

      // Add Items
      const newFavorites = items?.filter(
        (item) =>
          favoriteIds.has(item.id) &&
          !favoriteList.some((fav) => fav.id === item.id)
      );

      // Marge both arrays
      setFavoriteList([...updatedFavoriteList, ...newFavorites]);
    }
  };

  useEffect(() => {
    handleFetchFavorites();

    window.addEventListener("storage", () => handleFetchFavorites());
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <BsBookmarkStarFill className="text-yellow-500" size={28} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Favoritos</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-5 items-center h-[85svh] overflow-y-auto pb-10 px-5">
          {favoriteList.map((item) => (
            <div className="w-[400px] px-5">
              <ItemCard item={item} themeColor={themeColor} key={item.id} />
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoritesModal;
