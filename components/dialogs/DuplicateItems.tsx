import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useItemStore } from "@/context/item";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { fetchUserItemsByQuery } from "@/actions/item/fetchUserItemsByQuery";
import { createNewItem } from "@/actions/item/createNewItem";
import { ImSpinner2 } from "react-icons/im";

const DuplicateItemsDialog = () => {
  const { idList } = useItemStore();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDuplicate = async () => {
    setLoading(true);
    toast(
      <div className="flex">
        <p>Duplicando itens</p>
        <ImSpinner2 className="animate-spin" />
      </div>
    );
    try {
      idList.forEach(async (id) => {
        const { items } = await fetchUserItemsByQuery({ where: { id } });

        if (items[0]) {
          const { id: _, ...rest } = items[0];

          await createNewItem(rest, pathname);
        }

        return;
      });
      toast("Itens duplicados!");
    } catch (error) {
      toast("Erro ao duplicar itens");
      throw new Error("Error when duplicate items");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Duplicar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Duplicar {idList.length == 1 ? "item" : "Items"}
          </DialogTitle>
          <DialogDescription>
            <p>
              {idList.length == 1
                ? "Você está duplicando um item, deseja continuar?"
                : "Você está duplicando uma lista de items, tem certeza que deseja continuar?"}
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" onClick={handleDuplicate} disabled={loading}>
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateItemsDialog;
