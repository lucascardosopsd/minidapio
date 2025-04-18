'use client';
import { MenuItem } from '@prisma/client';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader } from '../ui/drawer';
import { Dispatch, SetStateAction } from 'react';
import { FullRestaurantProps } from '@/types/restaurant';
import ItemCard from './cards/Item';
import { ImSpinner2 } from 'react-icons/im';

interface SearchModalProps {
  isOpen: boolean;
  restaurant: FullRestaurantProps;
  items: MenuItem[];
  loading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchModal = ({ isOpen, restaurant, items, setOpen, loading }: SearchModalProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerDescription>
            {loading && (
              <div className="absolute z-50 flex h-[90svh] w-full items-center justify-center bg-background/50">
                <ImSpinner2 size={36} className="animate-spin" />
              </div>
            )}

            {items.length ? (
              <div className="mx-auto flex h-[90svh] max-w-lg flex-col gap-5 overflow-y-auto">
                <p className="text-center text-lg">Pesquisa</p>
                {items.map(item => (
                  <ItemCard item={item} themeColor={restaurant.color} key={item.id} />
                ))}
              </div>
            ) : (
              <></>
            )}

            {!items.length && !loading ? (
              <div className="flex h-[90svh] items-center justify-center">
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
