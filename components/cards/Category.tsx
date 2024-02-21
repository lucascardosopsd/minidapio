"use client";

import { CategoriesWithItemsProps } from "@/types/category";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CategorySheet from "../sheets/Category";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa6";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import ItemCard from "./Item";
import { useItemStore } from "@/context/item";
import { Badge } from "../ui/badge";
import DeleteModal from "../DeleteModal";
import ItemSheet from "../sheets/Item";
import ItemForm from "../forms/Item";
import { deleteCategory } from "@/actions/category/deleteCategory";
import { toast } from "sonner";
import CategoryForm from "../forms/Category";

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
  const { idList, setAllIds } = useItemStore();

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(category.id, restaurantId);
      toast("Categoria deletada");
    } catch (error) {
      toast("ocorreu um erro");
      throw new Error("Error when delete category");
    }
  };

  return (
    <AccordionItem
      className="flex flex-col mx-4 border-none "
      value={category.id}
    >
      <AccordionTrigger className="flex items-center p-4 h-16 w-full border border-border rounded">
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
              <AnimatePresence>
                {category.items &&
                  category.items.length > 1 &&
                  idList.length >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex gap-4 px-3">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const categoryItemsId = category.items.map(
                              (item) => item.id
                            );

                            return (
                              <Checkbox
                                checked={
                                  idList.length == categoryItemsId.length
                                }
                                onClick={() => {
                                  idList.length !== categoryItemsId.length
                                    ? setAllIds(categoryItemsId)
                                    : setAllIds([]);
                                }}
                              />
                            );
                          })()}

                          <p className="text-mutted">Todos</p>

                          <Separator orientation="vertical" />
                        </div>

                        <Button size="sm">Transferir</Button>

                        <Button size="sm">Duplicar</Button>

                        <Button size="sm" variant="destructive">
                          Apagar
                        </Button>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>

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
