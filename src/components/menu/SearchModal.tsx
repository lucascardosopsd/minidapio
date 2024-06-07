"use client";
import { Item } from "@prisma/client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "../ui/drawer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ItemCard from "./cards/Item";
import { useEffect, useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  items: Item[];
  themeColor: string;
}

const SearchModal = ({ isOpen, themeColor, items }: SearchModalProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleClearParams = (keys: string[]) => {
    keys.forEach((key) => {
      params.delete(key);
    });

    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Drawer
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      onClose={() => handleClearParams(["title", "categoryId"])}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerDescription>
            {items.length ? (
              <div className="max-w-lg mx-auto flex flex-col gap-5 h-[90svh] overflow-y-auto">
                {items.map((item) => (
                  <ItemCard item={item} themeColor={themeColor} />
                ))}
              </div>
            ) : (
              <></>
            )}

            {!items.length ? (
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
