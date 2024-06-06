import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useItemStore } from "@/context/item";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { fetchUserItemsByQuery } from "@/actions/item/fetchUserItemsByQuery";
import { createNewItem } from "@/actions/item/createNewItem";
import { ImSpinner2 } from "react-icons/im";
import { revalidateRoute } from "@/actions/revalidateRoute";

const DuplicateItemsDialog = () => {
  const { idList, setAllIds } = useItemStore();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDuplicate = async () => {
    setLoading(true);
    toast(
      <div className="flex gap-2 items-center">
        <p>Duplicando itens</p>
        <ImSpinner2 className="animate-spin" />
      </div>
    );
    try {
      if (idList.length > 1) {
        for (const id of idList) {
          const { items } = await fetchUserItemsByQuery({ where: { id } });

          if (items[0]) {
            const { id: _, ...rest } = items[0];

            await createNewItem({ data: rest });

            revalidateRoute({ fullPath: pathname });
          }

          toast(`Item ${items[0].title} duplicado.`);
        }
        toast("Duplicações completas!");

        return;
      }

      const { items } = await fetchUserItemsByQuery({
        where: { id: idList[0] },
      });

      if (items[0]) {
        const { id: _, ...rest } = items[0];

        await createNewItem({ data: rest });
        revalidateRoute({ fullPath: pathname });
      }

      toast(`Item ${items[0].title} duplicado.`);
    } catch (error) {
      toast("Erro ao duplicar itens");
      throw new Error("Error when duplicate items");
    } finally {
      setAllIds([]);
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
