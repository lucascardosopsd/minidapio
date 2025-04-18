'use client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CSSProperties, useState } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';
import { FullRestaurantProps } from '@/types/restaurant';
import { MenuItem } from '@prisma/client';
import { fetchItemsByQuery } from '@/actions/item/fetchItemsByQuery';
import { toast } from 'sonner';

interface SearchSectionProps {
  triggerClassName?: string;
  triggerStyles?: CSSProperties;
  inputClassName?: string;
  inputStyles?: CSSProperties;
  restaurant: FullRestaurantProps;
}

const SearchSection = ({
  triggerClassName,
  triggerStyles,
  inputClassName,
  inputStyles,
  restaurant,
}: SearchSectionProps) => {
  const [inputTerm, setInputTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([] as MenuItem[]);
  const [loading, setLoading] = useState(false);

  const handleToggleOpen = async () => {
    setLoading(true);

    setOpen(true);

    try {
      const items = await fetchItemsByQuery({
        where: {
          AND: [
            { restaurantId: restaurant.id },
            ...(restaurant.userId ? [{ userId: restaurant.userId }] : []),
            {
              name: {
                contains: inputTerm?.replace(/\s+$/, ''),
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      setItems(items);
    } catch (error) {
      toast.error('Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchModal
        isOpen={open}
        setOpen={setOpen}
        items={items}
        restaurant={restaurant}
        loading={loading}
      />

      <div className="flex flex-col gap-2 p-5">
        <div className="flex w-full flex-1 justify-end">
          <Input
            className={cn(
              'w-full rounded-r-none border-r-0 shadow-md placeholder:text-muted-foreground',
              inputClassName
            )}
            style={inputStyles}
            value={inputTerm}
            onChange={e => {
              setInputTerm(e.target.value);
            }}
            onKeyDown={e => e.key == 'Enter' && handleToggleOpen()}
            placeholder="Busque um item"
          />
          <Button
            size="icon"
            onClick={() => handleToggleOpen()}
            className={cn(
              'rounded-l-none border-l-0 text-lg text-muted-foreground shadow-md',
              triggerClassName
            )}
            style={triggerStyles}
            variant="outline"
          >
            <Search size={24} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
