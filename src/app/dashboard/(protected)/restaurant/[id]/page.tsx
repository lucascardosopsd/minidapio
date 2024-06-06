"use server";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";
import InputSearch from "@/components/restaurant/InputSearch";
import CategoryForm from "@/components/restaurant/forms/Category";
import ItemsActions from "@/components/restaurant/ItemsActions";
import CategoriesList from "@/components/restaurant/lists/Categories";
import { CategoriesWithItemsProps } from "@/types/category";
import ReusableSheet from "@/components/misc/ReusableSheet";

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string };
}

export default async function Restaurant({
  params: { id: restaurantId },
}: PageProps) {
  const categories: CategoriesWithItemsProps[] =
    await fetchUserCategoriesByQuery({
      where: {
        restaurantId,
      },
      orderBy: {
        order: "asc",
      },
      include: {
        items: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

  const items = categories.flatMap(
    (category) => category.items && category.items
  );

  return (
    <main className="flex flex-col gap-4 pt-5 h-[90svh] overflow-y-auto">
      <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-0 py-4 tablet:p-0 justify-between w-full items-center">
        <p>Categorias</p>

        <InputSearch restaurantId={restaurantId} disableParams />

        <div className="flex gap-2 w-full tablet:w-auto">
          <ReusableSheet
            title="Criar Categoria"
            trigger="Nova Categoria"
            triggerVariant="default"
            triggerClassName="w-full tablet:w-40"
            content={<CategoryForm restaurantId={restaurantId} />}
          />
        </div>
      </div>
      <Separator />
      {/* @ts-ignore */}
      <ItemsActions categories={categories} items={items!} />
      <div className="w-full mx-auto h-full tablet:h-[75svh] tablet:overflow-y-auto ">
        <Accordion type="multiple">
          <CategoriesList categories={categories} />
        </Accordion>
      </div>
    </main>
  );
}
