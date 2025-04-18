'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/tools/formatPrice';
import { MenuItem } from '@prisma/client';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TbStarFilled } from 'react-icons/tb';

// Extended interface with additional properties
interface ExtendedMenuItem extends MenuItem {
  image?: string;
  title?: string;
  sale?: boolean;
  salePrice?: number;
  highlight?: boolean;
}

interface ItemCardProps {
  item: ExtendedMenuItem;
  themeColor: string;
  highlight?: boolean;
}

const ItemCard = ({ item, themeColor, highlight }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleSetFavorite = () => {
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      ) as unknown as string[];

      const isFavorite = favorites?.includes(item.id);

      if (isFavorite) {
        const filter = favorites.filter(id => id !== item.id);

        localStorage.setItem('favorites', JSON.stringify(filter));

        setFavorite(false);

        window.dispatchEvent(new Event('storage'));

        return;
      }

      localStorage.setItem('favorites', JSON.stringify([...favorites, item.id]));

      setFavorite(true);

      window.dispatchEvent(new Event('storage'));

      return;
    }

    localStorage.setItem('favorites', JSON.stringify([item.id]));

    window.dispatchEvent(new Event('storage'));

    setFavorite(true);
  };

  const handleCheckFavorite = () => {
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      ) as unknown as string[];

      const isFavorite = favorites?.includes(item.id);
      setFavorite(isFavorite);
    }
  };

  useEffect(() => {
    handleCheckFavorite();

    window.addEventListener('storage', () => handleCheckFavorite());
  }, []);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex items-center justify-center p-0">
          <Image
            height={1000}
            width={1000}
            alt="Foto Produto"
            src={item.image as string}
            className="h-full w-full rounded-lg rounded-r-none"
            priority
          />
        </DialogContent>
      </Dialog>

      <div
        className={
          'relative flex min-h-36 w-full gap-4 rounded-lg border border-border/50 bg-card from-zinc-900/50 to-transparent dark:bg-gradient-to-tl'
        }
        style={{
          borderColor: highlight ? themeColor : '',
        }}
      >
        <div
          className="max-h-full max-w-full flex-1 rounded-l-lg"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={() => setIsModalOpen(true)}
        />

        <div className="flex w-full flex-[1.5] flex-col justify-center gap-2 p-5">
          {highlight && (
            <p
              className="text-xs text-muted-foreground"
              style={{
                color: themeColor,
              }}
            >
              Destaque
            </p>
          )}
          <div className="flex items-center gap-2 text-start text-sm font-semibold text-foreground ">
            <p className="flex-[4] select-none">{item.title}</p>

            <div
              onClick={handleSetFavorite}
              className={cn(
                'flex flex-1 scale-100 justify-center text-yellow-500 transition',
                favorite && 'scale-125'
              )}
            >
              <div className="self-start">
                {!favorite ? <Star size={24} /> : <TbStarFilled size={26} />}
              </div>
            </div>
          </div>
          <p className="select-none text-start text-xs text-muted-foreground">{item.description}</p>

          <div className="flex w-full items-center justify-between">
            <div className="flex-1">
              {item.sale ? (
                <>
                  {item.price && (
                    <p className="select-none text-start text-xs line-through">
                      {formatPrice(item?.price, 'pt-BR', 'BRL')}
                    </p>
                  )}
                  <p
                    className={cn(
                      'text-md select-none text-start',
                      item.highlight && 'text-background'
                    )}
                    style={{ color: !item.highlight ? themeColor : '' }}
                  >
                    {formatPrice(item.salePrice!, 'pt-BR', 'BRL')}
                  </p>
                </>
              ) : item?.price ? (
                <p className="select-none text-start font-bold" style={{ color: themeColor }}>
                  {formatPrice(item?.price, 'pt-BR', 'BRL')}
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
