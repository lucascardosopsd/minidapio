"use client";
import { Checkbox } from "../../ui/checkbox";
import ItemForm from "../forms/Item";
import { useItemStore } from "@/context/item";
import { Badge } from "../../ui/badge";
import { Category, Item } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRef, useState } from "react";
import { updateItem } from "@/actions/item/updateItem";
import { z } from "zod";
import { ItemValidator } from "@/validators/item";
import { toast } from "sonner";
import { FaPen } from "react-icons/fa6";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { usePathname } from "next/navigation";
import ReusableSheet from "@/components/misc/ReusableSheet";
import Image from "next/image";
import { NumericFormat } from "react-number-format";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ItemRowProps {
  item: Item;
  categories: Category[];
}

const ItemRow = ({ item, categories }: ItemRowProps) => {
  const { toggleId, idList } = useItemStore();
  const [price, setPrice] = useState(item.price);
  const priceRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpdateItem = async (
    data: Partial<z.infer<typeof ItemValidator>>
  ) => {
    setLoading(true);
    try {
      await updateItem({ data, id: item.id });
      toast.success("Item Atualizado!");
      revalidateRoute({ fullPath: pathname });
    } catch (error) {
      toast.error("Ocorreu um erro.");
      throw new Error("Error when create/update new item");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          onClick={() => toggleId(item.id)}
          checked={idList.some((id) => item.id == id)}
        />
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

      <TableCell>
        <div className="flex items-center">
          <p>{item.title}</p>

          <p className="text-primary text-xs ml-1">[{item.order!}]</p>
        </div>
      </TableCell>

      <TableCell>
        {item.description ? (
          <Badge className="w-full  flex justify-center">Sim</Badge>
        ) : (
          <Badge variant="outline" className="w-full flex justify-center">
            Não
          </Badge>
        )}
      </TableCell>

      <TableCell className="flex justify-center w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {item?.price ? (
                <NumericFormat
                  decimalSeparator=","
                  valueIsNumericString
                  decimalScale={2}
                  maxLength={8}
                  prefix="R$"
                  placeholder="R$0,00"
                  onValueChange={(values) => setPrice(values.floatValue!)}
                  value={price}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      priceRef?.current && priceRef.current.blur();

                      handleUpdateItem({
                        price: item.price,
                      });
                    }
                  }}
                  getInputRef={priceRef}
                  className="max-w-32 text-center"
                />
              ) : (
                <p>Sem Preço</p>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {item.sale && (
          <p className="text-primary">
            {item?.salePrice &&
              item?.salePrice > 0 &&
              item?.salePrice.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
          </p>
        )}
      </TableCell>

      <TableCell>
        {item.sale ? (
          <Badge className="w-full  flex justify-center">Promoção</Badge>
        ) : (
          <Badge variant="outline" className="w-full flex justify-center">
            Não
          </Badge>
        )}
      </TableCell>

      <TableCell>
        {item.highlight ? (
          <Badge className="w-full flex justify-center">Destaque</Badge>
        ) : (
          <Badge variant="outline" className="w-full flex justify-center">
            Não
          </Badge>
        )}
      </TableCell>

      <TableCell>
        {item.active ? (
          <Badge className="w-full flex justify-center">Ativo</Badge>
        ) : (
          <Badge variant="outline" className="w-full flex justify-center">
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
