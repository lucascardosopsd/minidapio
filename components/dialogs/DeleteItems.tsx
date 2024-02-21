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
import { deleteManyItems } from "@/actions/item/deleteManyItems";

const DeleteItemsDialog = () => {
  const { idList } = useItemStore();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteManyItems(idList, pathname);
      toast("Itens deletados!");
    } catch (error) {
      toast("Erro ao deletar itens");
      throw new Error("Error when delete items");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Excluir {idList.length == 1 ? "item" : "Items"}
          </DialogTitle>
          <DialogDescription>
            <p>
              {idList.length == 1
                ? "Você está apagando um item, deseja continuar?"
                : "Você está apagando uma lista de items, tem certeza que deseja continuar?"}
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemsDialog;
