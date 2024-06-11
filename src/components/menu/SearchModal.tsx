"use client";
import { Item } from "@prisma/client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "../ui/drawer";
import { Dispatch, SetStateAction } from "react";
import { FullRestaurantProps } from "@/types/restaurant";
import ItemCard from "./cards/Item";
import { ImSpinner2 } from "react-icons/im";

interface SearchModalProps {
  isOpen: boolean;
  restaurant: FullRestaurantProps;
  items: Item[];
  loading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchModal = ({
  isOpen,
  restaurant,
  items,
  setOpen,
  loading,
}: SearchModalProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerDescription>
            {loading && (
              <div className="absolute h-full w-full bg-background/50 flex items-center justify-center z-50">
                <ImSpinner2 size={36} className="animate-spin" />
              </div>
            )}

            {items.length ? (
              <div className="max-w-lg mx-auto flex flex-col gap-5 h-[90svh] overflow-y-auto">
                <p className="text-lg text-center">Pesquisa</p>
                {items.map((item) => (
                  <ItemCard
                    item={item}
                    themeColor={restaurant.color}
                    highlight={item.highlight}
                    key={item.id}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}

            {!items.length && !loading ? (
              <div className="flex items-center justify-center h-[90svh]">
                <p>Nenhum item encontrado</p>
              </div>
            ) : (
              <></>
            )}
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchModal;
