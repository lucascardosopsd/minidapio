"use client";
import { Checkbox } from "../../ui/checkbox";
import ItemForm from "../forms/Item";
import { useItemStore } from "@/context/item";
import { Badge } from "../../ui/badge";
import { Category } from "@prisma/client";
import { ItemProps } from "@/types/item";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { updateItem } from "@/actions/item/updateItem";
import { z } from "zod";
import { ItemValidator } from "@/validators/item";
import { toast } from "sonner";
import { FaPen } from "react-icons/fa6";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { usePathname } from "next/navigation";
import ReusableSheet from "@/components/misc/ReusableSheet";

interface ItemRowProps {
  item: ItemProps;
  categories: Category[];
}

const ItemRow = ({ item, categories }: ItemRowProps) => {
  const { toggleId, idList } = useItemStore();
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
        <div className="flex items-center">
          <p>{item.title}</p>

          <p className="text-primary text-xs ml-1">[{item.order!}]</p>
        </div>
      </TableCell>

      <TableCell>
        <p
          className={item.salePrice ? "line-through text-muted-foreground" : ""}
        >
          {item.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

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
            Normal
          </Badge>
        )}
      </TableCell>

      <TableCell>
        {item.highlight ? (
          <Badge className="w-full flex justify-center">Destaque</Badge>
        ) : (
          <Badge variant="outline" className="w-full flex justify-center">
            Normal
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
