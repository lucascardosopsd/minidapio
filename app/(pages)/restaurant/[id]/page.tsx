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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { FaList, FaPen, FaTrash } from "react-icons/fa6";
import ItemForm from "@/components/forms/Item";
import ItemSheet from "@/components/sheets/Item";
import ItemCard from "@/components/ItemCard";

export default function Restaurant() {
  const [imageUrl, setImageUrl] = useState<string>();

  return (
    <main className="flex flex-col items-start justify-center h-[calc(100svh-4rem)] gap-4">
      <div className="flex justify-between w-full items-center">
        <p>Categorias</p>

        <div className="flex gap-2 flex-1 mx-8">
          <Input />
          <Button variant="outline">Buscar</Button>
        </div>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Nova Categoria</Button>
            </SheetTrigger>

            <SheetContent className="w-1/2">
              <SheetHeader>
                <SheetTitle>Nova Categoria</SheetTitle>
              </SheetHeader>
              <div>
                <p>Nome</p>
                <Input />
              </div>

              <SheetFooter className="py-2">
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Criar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

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
        <Accordion className="space-y-4" type="single">
          {categories.map((category) => (
            <AccordionItem
              className="flex flex-col mx-4 border-none"
              value={category.id.toString()}
            >
              <AccordionTrigger className="flex items-center p-4 h-16 w-full border border-border rounded">
                <p>{category.title}</p>
                <div className="flex gap-4 ml-auto mr-2">
                  <Button variant="default">
                    <FaList />
                  </Button>

                  <Button variant="secondary">
                    <FaPen />
                  </Button>

                  <Button variant="destructive">
                    <FaTrash />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {items.length > 0 &&
                  items
                    .filter((item) => item.categoryId == category.id)
                    .map((item) => <ItemCard item={item} />)}

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
