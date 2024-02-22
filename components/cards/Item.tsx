"use client";
import { ItemProps } from "@/types/item";
import { Checkbox } from "../ui/checkbox";
import { FaPen } from "react-icons/fa6";
import ItemSheet from "../sheets/Item";
import ItemForm from "../forms/Item";
import { useItemStore } from "@/context/item";
import { Badge } from "../ui/badge";
import { CategoryProps } from "@/types/category";

interface ItemCardProps {
  item: ItemProps;
  categories: CategoryProps[];
  restaurantId: string;
}

const ItemCard = ({ item, categories, restaurantId }: ItemCardProps) => {
  const { toggleId, idList } = useItemStore();

  return (
    <div
      className="flex items-center justify-between h-16 w-full border border-primary rounded px-2"
      key={item.id}
    >
      <div className="flex-[0.1] mr-2">
        <Checkbox
          onClick={() => toggleId(item.id)}
          checked={idList.some((id) => item.id == id)}
        />
      </div>

      <p className="flex-[1.9]">{item.title}</p>

      <div className="flex justify-center flex-col flex-1">
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
      </div>

      <div className="flex items-center gap-2 flex-1">
        {item.sale ? (
          <Badge className="w-full max-w-[100px] flex justify-center">
            Promoção
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="w-full max-w-[100px] flex justify-center"
          >
            Preço
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 flex-1">
        {item.highlight ? (
          <Badge className="w-full max-w-[100px] flex justify-center">
            Destaque
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="w-full max-w-[100px] flex justify-center"
          >
            Normal
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 flex-1">
        {item.active ? (
          <Badge className="w-full max-w-[100px] flex justify-center">
            Ativo
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="w-full max-w-[100px] flex justify-center"
          >
            Inativo
          </Badge>
        )}
      </div>

      <div className="flex gap-2 justify-end flex-1">
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
      </div>
    </div>
  );
};

export default ItemCard;
