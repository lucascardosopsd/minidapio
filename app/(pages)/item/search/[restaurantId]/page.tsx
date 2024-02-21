"use server";
import { Separator } from "@/components/ui/separator";
import InputSearch from "@/components/InputSearch";
import { fixParamsValues } from "@/tools/fixParamsValues";
import { redirect } from "next/navigation";
import { fetchUserItemsByQuery } from "@/actions/item/fetchUserItemsByQuery";
import ItemCard from "@/components/cards/Item";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";

interface PageProps {
  params: {
    restaurantId: string;
  };
  searchParams?: { [key: string]: string };
}

export default async function Restaurant({
  params: { restaurantId },
  searchParams,
}: PageProps) {
  if (!searchParams) {
    redirect("/restaurant/" + restaurantId);
  }

  const categories = await fetchUserCategoriesByQuery({
    where: {
      restaurantId,
    },
  });

  const items = await fetchUserItemsByQuery({
    where: {
      ...fixParamsValues(searchParams),
    },
  });

  return (
    <main className="flex flex-col gap-4 pt-5 h-[90svh] overflow-y-auto">
      <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-0 py-4 tablet:p-0 justify-between w-full items-center">
        <p>Items</p>

        <InputSearch restaurantId={restaurantId} />
      </div>
      <Separator />

      <div className="w-full mx-auto h-full tablet:h-[75svh] tablet:overflow-y-auto space-y-2">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            restaurantId={restaurantId}
            categories={categories}
          />
        ))}

        {!items.length && <p>Nenhum item encontrado.</p>}
      </div>
    </main>
  );
}
