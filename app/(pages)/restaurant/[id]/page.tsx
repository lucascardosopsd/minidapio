"use client";
import { categories } from "@/mock/categories";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CategorySheet from "@/components/sheets/Category";
import CategoryCard from "@/components/cards/Category";

export default function Restaurant() {
  
  return (
    <main className="flex flex-col items-start justify-center h-[calc(100svh-4rem)] gap-4">
      <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-0 py-4 tablet:p-0 justify-between w-full items-center">
        <p>Categorias</p>

        <div className="flex mx-8 w-full">
          <Input className="w-full rounded-r-none" />
          <Button variant="outline" className="rounded-l-none border-l-0">
            Buscar
          </Button>
        </div>

        <div className="flex gap-2 w-full tablet:w-auto">
          <CategorySheet
            sheetTitle="Criar Categoria"
            triggerText="Nova Categoria"
            triggerVariant="default"
            triggerClassname="w-full tablet:w-40"
          />
        </div>
      </div>
      <Separator />

      <ScrollArea className="h-[75svh] w-full mx-auto">
        <Accordion className="space-y-2 pb-10 tablet:pb-0" type="multiple">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </Accordion>
      </ScrollArea>
    </main>
  );
}
