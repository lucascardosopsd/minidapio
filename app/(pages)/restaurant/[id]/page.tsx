"use client";
import { categories } from "@/mock/categories";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CategorySheet from "@/components/sheets/Category";
import CategoryCard from "@/components/cards/CategoryCard";

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
        </div>
      </div>
      <Separator />

      <ScrollArea className="h-[75svh] w-full mx-auto">
        <Accordion className="space-y-2" type="single">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </Accordion>
      </ScrollArea>
    </main>
  );
}
