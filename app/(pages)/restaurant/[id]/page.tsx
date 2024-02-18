"use server";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CategorySheet from "@/components/sheets/Category";
import CategoryCard from "@/components/cards/Category";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Restaurant({
  params: { id: restaurantId },
}: PageProps) {
  const categories = await fetchUserCategoriesByQuery({
    where: {
      restaurantId,
    },
    include: {
      items: true,
    },
  });

  return (
    <main className="flex flex-col items-start justify-center gap-4 mt-5">
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
            restaurantId={restaurantId}
          />
        </div>
      </div>
      <Separator />

      <ScrollArea className="h-[80svh] w-full mx-auto">
        <Accordion className="space-y-2 pb-10 tablet:pb-0" type="multiple">
          {categories.map((category) => (
            <CategoryCard
              category={category}
              key={category.id}
              restaurantId={restaurantId}
              categories={categories}
            />
          ))}
        </Accordion>
      </ScrollArea>
    </main>
  );
}
