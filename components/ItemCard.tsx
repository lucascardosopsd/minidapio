import { ItemProps } from "@/types/item";
import { Checkbox } from "./ui/checkbox";
import { FaPen, FaTrash } from "react-icons/fa6";
import ItemSheet from "./sheets/Item";
import ItemForm from "./forms/Item";
import { useItemStore } from "@/context/item";
import { Badge } from "./ui/badge";
import DeleteModal from "./DeleteModal";
import { CategoryProps } from "@/types/category";

interface ItemCardProps {
  item: ItemProps;
  category: CategoryProps;
}

const ItemCard = ({ item, category }: ItemCardProps) => {
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

      <p className="flex-[2]">{item.title}</p>

      <div className="flex gap-4 flex-1">
        <div className="flex justify-center flex-col flex-1">
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

        <div className="flex items-center gap-2 flex-1">
          {item.sale ? (
            <Badge className="w-full flex justify-center">Promoção</Badge>
          ) : (
            <Badge variant="outline" className="w-full flex justify-center">
              Preço
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 flex-1">
          {item.highlight ? (
            <Badge className="w-full flex justify-center">Destaque</Badge>
          ) : (
            <Badge variant="outline">Normal</Badge>
          )}
        </div>

        <div className="flex gap-2 justify-end flex-1">
          <ItemSheet
            itemForm={<ItemForm defaultValues={item} />}
            sheetTitle="Novo Item"
            triggerText={<FaPen />}
            triggerVariant="secondary"
          />

          <DeleteModal
            action={() => {}}
            dialogTitle="Deletar Item"
            triggerText={<FaTrash />}
            dialogDescription={
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p>Você está apagando o item</p>
                  <Badge>{item.title}</Badge>
                </div>

                <div className="flex gap-2">
                  <p>Da categoria</p>
                  <Badge variant="destructive">{category.title}</Badge>
                </div>
              </div>
            }
            triggerVariant="destructive"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
