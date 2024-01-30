import { ItemProps } from "@/types/item";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { FaPen, FaTrash } from "react-icons/fa6";
import ItemSheet from "./sheets/Item";
import ItemForm from "./forms/Item";
import { useItemStore } from "@/context/item";

interface ItemCardProps {
  item: ItemProps;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const { toggleId, idList } = useItemStore();

  return (
    <div
      className="flex items-center justify-between h-16 w-full border border-primary rounded p-4"
      key={item.id}
    >
      <div className="flex justify-between items-center w-full max-w-[400px]">
        <Checkbox
          onClick={() => toggleId(item.id)}
          checked={idList.some((id) => item.id == id)}
        />
        <p>{item.title}</p>

        <div className="flex flex-col">
          <p className={item.salePrice ? "line-through text-muted" : ""}>
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
        <div className="flex items-center gap-2">
          <p>Destaque</p>
          <Checkbox checked={item.highlight} />
        </div>
      </div>

      <div className="flex gap-4 ml-auto mr-2">
        <ItemSheet
          itemForm={<ItemForm defaultValues={item} />}
          sheetTitle="Novo Item"
          triggerText={<FaPen />}
          triggerVariant="secondary"
        />

        <Button variant="destructive">
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
