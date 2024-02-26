"use client";
import { CategoriesWithItemsProps } from "@/types/category";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CategorySheet from "../sheets/Category";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa6";
import ItemCard from "./Item";
import { Badge } from "../ui/badge";
import DeleteModal from "../DeleteModal";
import ItemSheet from "../sheets/Item";
import ItemForm from "../forms/Item";
import { deleteCategory } from "@/actions/category/deleteCategory";
import { toast } from "sonner";
import CategoryForm from "../forms/Category";
import { usePathname } from "next/navigation";
import { MdDragIndicator } from "react-icons/md";

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

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(category.id, restaurantId, pathname);
      toast("Categoria deletada");
    } catch (error) {
      toast("ocorreu um erro");
      throw new Error("Error when delete category");
    }
  };

  return (
    <AccordionItem
      className="flex flex-col mx-4 border-none bg-background"
      value={category.id}
    >
      <AccordionTrigger className="flex items-center p-4 h-16 w-full border border-border rounded">
        <MdDragIndicator
          size={24}
          className="text-accent mr-2 hover:cursor-grabbing"
        />
        <p>{category.title}</p>
        <div className="flex gap-4 ml-auto">
          <CategorySheet
            sheetTitle="Editar Categoria"
            triggerText={<FaPen />}
            triggerVariant="default"
            defaultValues={category}
            categoryForm={
              <CategoryForm
                defaultValues={category}
                categoryId={category.id}
                restaurantId={restaurantId}
              />
            }
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
              <div className="flex items-center pl-3 text-foreground/50 ">
                <div className="flex gap-2 flex-[2]">
                  <p>
                    <FaCheck />
                  </p>
                  <p>Nome</p>
                </div>
                <p className="flex-1">Preço</p>
                <p className="flex-1">Desconto</p>
                <p className="flex-1">Tipo</p>
                <p className="flex-1">Status</p>
                <p className="flex-1 flex justify-center">Ações</p>
              </div>

              {category.items &&
                category.items.map((item) => (
                  <ItemCard
                    categories={categories}
                    item={item}
                    key={item.id}
                    restaurantId={restaurantId}
                  />
                ))}
            </div>

            {!category.items && (
              <p className="text-center p-4">Categoria sem items.</p>
            )}
          </div>
        </div>

        <div className="flex mt-2">
          <ItemSheet
            itemForm={
              <ItemForm
                categoryId={category.id.toString()}
                restaurantId={restaurantId}
                categories={categories}
              />
            }
            sheetTitle="Novo Item"
            triggerText="Novo Item"
            triggerVariant="default"
            triggerStyles="w-full"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryCard;
