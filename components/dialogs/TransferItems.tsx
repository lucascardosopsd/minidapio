import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CategoryProps } from "@/types/category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useItemStore } from "@/context/item";
import { Form } from "../ui/form";
import SelectBuilder from "../builders/SelectBuilder";
import { SelectItem } from "../ui/select";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { updateManyItems } from "@/actions/item/updateManyItems";

interface TransferItemsProps {
  categories: CategoryProps[];
}

const TransferItemsDialog = ({ categories }: TransferItemsProps) => {
  const { idList, setAllIds } = useItemStore();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const transferResolver = z.object({
    categoryId: z.string({ required_error: "Selecione a categoria" }),
  });

  const form = useForm<{ categoryId: string }>({
    resolver: zodResolver(transferResolver),
  });

  const handleTransfer = async (data: z.infer<typeof transferResolver>) => {
    setLoading(true);
    try {
      await updateManyItems(data, idList, pathname);
      toast("Itens transferidos!");
    } catch (error) {
      toast("Erro ao transferir itens");
      throw new Error("Error when transfer items");
    } finally {
      setAllIds([]);
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Transferir</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transferir items</DialogTitle>
          <DialogDescription>
            Selecione abaixo a categoria destino
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleTransfer)}>
            <SelectBuilder
              control={form.control}
              name="categoryId"
              selectItem={categories.map((category) => (
                <SelectItem value={category.id}>{category.title}</SelectItem>
              ))}
            />
            <div className="flex justify-end mt-5">
              <Button type="submit" disabled={loading}>
                Transferir
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TransferItemsDialog;
