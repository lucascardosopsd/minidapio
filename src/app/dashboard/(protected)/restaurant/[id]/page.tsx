"use server";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";
import ItemsActions from "@/components/restaurant/ItemsActions";
import CategoriesList from "@/components/restaurant/lists/Categories";
import { CategoriesWithItemsProps } from "@/types/category";
import RestaurantActionbar from "@/components/restaurant/Actionbar";

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
            order: "desc",
          },
        },
      },
    });

  const items = categories.flatMap(
    (category) => category.items && category.items
  );

  return (
    <main className="flex flex-col gap-4 pt-5 h-[90svh] overflow-y-auto">
      <RestaurantActionbar restaurantId={restaurantId} />

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
