'use client';
import { Checkbox } from '../../ui/checkbox';
import ItemForm from '../forms/Item';
import { useItemStore } from '@/context/item';
import { Badge } from '../../ui/badge';
import { Category, MenuItem } from '@prisma/client';
import { TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useRef, useState } from 'react';
import { updateItem } from '@/actions/item/updateItem';
import { z } from 'zod';
import { ItemValidator } from '@/validators/item';
import { toast } from 'sonner';
import { FaPen } from 'react-icons/fa6';
import { revalidateRoute } from '@/actions/revalidateRoute';
import { usePathname } from 'next/navigation';
import ReusableSheet from '@/components/misc/ReusableSheet';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Extended type with additional properties
type ExtendedMenuItem = MenuItem & {
  title?: string;
  image?: string;
  order?: number;
  sale?: boolean;
  salePrice?: number;
  highlight?: boolean;
  active?: boolean;
};

interface ItemRowProps {
  item: ExtendedMenuItem;
  categories: Category[];
}

const ItemRow = ({ item, categories }: ItemRowProps) => {
  const { toggleId, idList } = useItemStore();

  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  const priceRef = useRef<HTMLInputElement>(null);
  const saleRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (item.price) setPrice(item.price);

    if (item.salePrice) setSalePrice(item.salePrice);
  }, [item.price]);

  const handleUpdateItem = async (data: Partial<z.infer<typeof ItemValidator>>) => {
    setLoading(true);
    try {
      await updateItem({
        data: data as z.infer<typeof ItemValidator>,
        id: item.id,
      });
      toast.success('Item Atualizado!');
      revalidateRoute({ fullPath: pathname });
    } catch (error) {
      toast.error('Ocorreu um erro.');
      throw new Error('Error when create/update new item');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox onClick={() => toggleId(item.id)} checked={idList.some(id => item.id == id)} />
      </TableCell>

      <TableCell>
        {item.image ? (
          <Image
            alt="imagem do produto"
            src={item.image}
            height={500}
            width={500}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <></>
        )}
      </TableCell>

      <TableCell className="w-max">
        <div className="flex items-center">
          <p>{item.title}</p>

          <p className="ml-1 text-xs text-primary">[{item.order!}]</p>
        </div>
      </TableCell>

      <TableCell>
        {item.description ? (
          <Badge className="flex w-full justify-center">Sim</Badge>
        ) : (
          <Badge variant="outline" className="flex w-full justify-center">
            Não
          </Badge>
        )}
      </TableCell>

      <TableCell className="max-w-32">
        {item.price ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="mx-auto flex items-center justify-center">
                <NumericFormat
                  decimalSeparator=","
                  valueIsNumericString
                  decimalScale={2}
                  maxLength={8}
                  prefix="R$"
                  placeholder="R$0,00"
                  onValueChange={values => setPrice(values.floatValue!)}
                  value={price}
                  onKeyDown={e => {
                    if (e.key == 'Enter') {
                      priceRef?.current && priceRef.current.blur();

                      if (typeof price == 'undefined') {
                        handleUpdateItem({ price: 0 });
                        return;
                      }

                      handleUpdateItem({ price });
                    }
                  }}
                  getInputRef={priceRef}
                  className="max-w-32 !rounded-full text-center"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p className="text-center">Sem preço</p>
        )}
      </TableCell>

      <TableCell className="max-w-32">
        {item.sale ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="mx-auto flex items-center justify-center">
                <NumericFormat
                  decimalSeparator=","
                  valueIsNumericString
                  decimalScale={2}
                  maxLength={8}
                  prefix="R$"
                  placeholder="R$0,00"
                  onValueChange={values => setSalePrice(values.floatValue!)}
                  value={salePrice}
                  onKeyDown={e => {
                    if (e.key == 'Enter') {
                      saleRef?.current && saleRef.current.blur();

                      if (typeof salePrice == 'undefined') {
                        handleUpdateItem({ salePrice: 0 });
                        return;
                      }

                      if (salePrice >= price) {
                        toast.error('Preço da promoção precisa ser menor que o preço do produto.');

                        return;
                      }

                      handleUpdateItem({ salePrice });
                    }
                  }}
                  getInputRef={saleRef}
                  className="max-w-32 !rounded-full text-center"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Badge variant="outline" className="mx-auto flex max-w-32 justify-center py-3">
            Não
          </Badge>
        )}
      </TableCell>

      <TableCell>
        {item.highlight ? (
          <Badge className="mx-auto flex w-full max-w-32 justify-center">Destaque</Badge>
        ) : (
          <Badge variant="outline" className="mx-auto flex w-full max-w-32 justify-center">
            Não
          </Badge>
        )}
      </TableCell>

      <TableCell>
        {item.active ? (
          <Badge className="mx-auto flex w-full max-w-32 justify-center">Ativo</Badge>
        ) : (
          <Badge variant="outline" className="mx-auto flex w-full max-w-32 justify-center">
            Inativo
          </Badge>
        )}
      </TableCell>

      <TableCell>
        <ReusableSheet
          content={
            <ItemForm
              categoryId={item.categoryId!}
              categories={categories}
              onSubmit={handleUpdateItem}
              loading={loading}
              defaultValues={item}
            />
          }
          title="Atualizar Item"
          trigger={<FaPen size={12} />}
          triggerVariant="default"
          triggerSize="icon"
          isOpen={open}
          onOpen={setOpen}
        />
      </TableCell>
    </TableRow>
  );
};

export default ItemRow;
