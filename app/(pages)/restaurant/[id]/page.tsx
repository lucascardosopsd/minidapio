"use client";
import { categories } from "@/mock/categories";
import { items } from "@/mock/items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FaPen, FaTrash } from "react-icons/fa6";
import ItemForm from "@/components/forms/Item";
import ItemSheet from "@/components/sheets/Item";
import ItemCard from "@/components/ItemCard";
import CategorySheet from "@/components/sheets/Category";

export default function Restaurant() {
  return (
    <main className="flex flex-col items-start justify-center h-[calc(100svh-4rem)] gap-4">
      <div className="flex justify-between w-full items-center">
        <p>Categorias</p>

        <div className="flex gap-2 flex-1 mx-8">
          <Input />
          <Button variant="outline">Buscar</Button>
        </div>

        <div className="flex gap-2">
          <CategorySheet
            sheetTitle="Criar Categoria"
            triggerText="Nova Categoria"
            triggerVariant="default"
          />

          <ItemSheet
            itemForm={<ItemForm />}
            sheetTitle="Novo Item"
            triggerText="Novo Item"
            triggerVariant="secondary"
          />
        </div>
      </div>
      <Separator />

      <ScrollArea className="h-[75svh] w-full mx-auto">
        <Accordion className="space-y-2" type="single">
          {categories.map((category) => (
            <AccordionItem
              className="flex flex-col mx-4 border-none"
              value={category.id.toString()}
            >
              <AccordionTrigger className="flex items-center p-4 h-16 w-full border border-border rounded">
                <p>{category.title}</p>
                <div className="flex gap-4 ml-auto mr-2">
                  <CategorySheet
                    sheetTitle="Editar Categoria"
                    triggerText={<FaPen />}
                    triggerVariant="default"
                    defaultValues={category}
                  />

                  <Button variant="destructive">
                    <FaTrash />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 mt-2">
                  {items.length > 0 &&
                    items
                      .filter((item) => item.categoryId == category.id)
                      .map((item) => <ItemCard item={item} key={item.id} />)}
                </div>
                {items.filter((item) => item.categoryId == category.id)
                  .length == 0 && (
                  <p className="text-center p-4">Categoria sem items.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </main>
  );
}
