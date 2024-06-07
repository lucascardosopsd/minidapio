"use client";
import { CategoriesWithItemsProps } from "@/types/category";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { FaPen, FaTrash } from "react-icons/fa6";
import { Badge } from "../../ui/badge";
import DeleteModal from "../DeleteModal";
import { deleteCategory } from "@/actions/category/deleteCategory";
import { toast } from "sonner";
import CategoryForm from "../forms/Category";
import { usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ItemRow from "../tableRows/Item";
import ItemForm from "../forms/Item";
import { CopyPlus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { createNewItem } from "@/actions/item/createNewItem";
import { ItemValidator } from "@/validators/item";
import { revalidateRoute } from "@/actions/revalidateRoute";
import ReusableSheet from "@/components/misc/ReusableSheet";
import { updateCategory } from "@/actions/category/updateCategory";
import { categoryValidator } from "@/validators/category";

interface CategoryCardProps {
  category: CategoriesWithItemsProps;
  restaurantId: string;
  categories: CategoriesWithItemsProps[];
}

const CategoryCard = ({
  category,
  restaurantId,
  categories,
}: CategoryCardProps) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNewItem = async (data: z.infer<typeof ItemValidator>) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    data.restaurantId = restaurantId;

    setLoading(true);
    try {
      await createNewItem({ data });
      toast.success("Item criado!");
      revalidateRoute({ fullPath: pathname });
    } catch (error) {
      toast.error("Ocorreu um erro.");
      throw new Error("Error when create/update new item");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(category.id, restaurantId, pathname);
      toast("Categoria deletada");
    } catch (error) {
      toast("ocorreu um erro");
      throw new Error("Error when delete category");
    }
  };

  const handleUpdateCategory = async (
    data: z.infer<typeof categoryValidator>
  ) => {
    setLoading(true);

    try {
      await updateCategory({ data, id: category.id });

      revalidateRoute({ fullPath: pathname });
      toast("Categoria atualizada");
    } catch (error) {
      console.log(error);
      toast("Ocorreu um erro.");
      throw new Error("Can't update category");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <AccordionItem
      className="flex flex-col mx-4 border-none bg-background"
      value={category.id}
    >
      <AccordionTrigger className="flex items-center p-4 h-16 w-full border border-border rounded">
        <p>{category.title}</p>
        <div className="flex gap-4 ml-auto">
          <ReusableSheet
            content={
              <ItemForm
                categoryId={category.id.toString()}
                categories={categories}
                onSubmit={handleNewItem}
                loading={loading}
              />
            }
            title="Novo Item"
            trigger={<CopyPlus size={18} />}
            triggerClassName="w-full"
            triggerVariant="default"
            isOpen={open}
            onOpen={setOpen}
          />

          <ReusableSheet
            title="Editar Categoria"
            trigger={<FaPen />}
            triggerVariant="outline"
            content={
              <CategoryForm
                defaultValues={category}
                restaurantId={restaurantId}
                onSubmit={handleUpdateCategory}
                loading={loading}
              />
            }
            isOpen={open}
            onOpen={setOpen}
          />

          <DeleteModal
            action={handleDeleteCategory}
            dialogTitle="Deletar Categoria"
            triggerText={<FaTrash />}
            dialogDescription={
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p>Você está apagando a categoria</p>
                  <Badge>{category.title}</Badge>
                </div>
              </div>
            }
            triggerVariant="destructive"
          />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="overflow-x-auto w-[calc(100svw-60px)] tablet:w-full">
          <div className="w-[250svw] pr-20 tablet:pr-0 tablet:w-full">
            <div className="flex flex-col space-y-2 mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>

                    <TableHead>Nome</TableHead>
                    <TableHead>Desconto</TableHead>
                    <TableHead className="text-center">Preço</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Editar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.items &&
                    category?.items.map((item) => (
                      <ItemRow categories={categories} item={item} />
                    ))}
                </TableBody>
              </Table>
            </div>

            {!category.items && (
              <p className="text-center p-4">Categoria sem items.</p>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryCard;
