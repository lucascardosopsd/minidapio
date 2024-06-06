"use client";
import { Checkbox } from "../../ui/checkbox";
import { FaPen } from "react-icons/fa6";
import ItemSheet from "../modals/Item";
import ItemForm from "../forms/Item";
import { useItemStore } from "@/context/item";
import { Badge } from "../../ui/badge";
import { Category } from "@prisma/client";
import { ItemProps } from "@/types/item";
import { TableCell, TableRow } from "@/components/ui/table";

interface ItemRowProps {
  item: ItemProps;
  categories: Category[];
  restaurantId: string;
}

const ItemRow = ({ item, categories, restaurantId }: ItemRowProps) => {
  const { toggleId, idList } = useItemStore();

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
        <ItemSheet
          itemForm={
            <ItemForm
              defaultValues={item}
              categories={categories}
              restaurantId={restaurantId}
              itemId={item.id}
            />
          }
          sheetTitle="Editar Item"
          triggerText={<FaPen />}
          triggerVariant="default"
        />
      </TableCell>
    </TableRow>
  );
};

export default ItemRow;
