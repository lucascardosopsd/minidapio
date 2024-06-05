"use server";
import { Separator } from "@/components/ui/separator";
import InputSearch from "@/components/restaurant/InputSearch";
import { redirect } from "next/navigation";
import { fetchUserItemsByQuery } from "@/actions/item/fetchUserItemsByQuery";
import ItemCard from "@/components/restaurant/cards/Item";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";
import Paginate from "@/components/restaurant/Pagination";
import BottomFade from "@/components/restaurant/BottomFade";
import ItemsActions from "@/components/restaurant/ItemsActions";

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
    redirect("/dashboard/restaurant/" + restaurantId);
  }

  const categories = await fetchUserCategoriesByQuery({
    where: {
      restaurantId,
    },
  });

  const itemsPerPage = 10;

  const { items, count } = await fetchUserItemsByQuery({
    where: {
      title: searchParams.title && searchParams.title,
      description: searchParams.description && searchParams.description,
      active:
        searchParams.active && searchParams.active == "true" ? true : false,
      price: searchParams.price ? parseFloat(searchParams.price!) : undefined,
      sale: searchParams.sale && searchParams.sale == "true" ? true : false,
      categoryId: searchParams.categoryId && searchParams.categoryId,
    },
  });

  const pageItems = items.slice(
    (Number(searchParams.page) - 1) * itemsPerPage,
    itemsPerPage * Number(searchParams.page)
  );

  return (
    <main className="flex flex-col gap-4 pt-5 h-[90svh] ">
      <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-0 py-4 tablet:p-0 justify-between w-full items-center">
        <p>Items</p>

        <InputSearch restaurantId={restaurantId} />
      </div>
      <Separator />

      <ItemsActions categories={categories} items={items} visible />

      <div className="relative">
        <div
          className={`w-full mx-auto h-full tablet:h-[58svh] tablet:overflow-y-auto space-y-2 pb-10`}
        >
          {pageItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              restaurantId={restaurantId}
              categories={categories}
            />
          ))}

          {!items.length && <p>Nenhum item encontrado.</p>}
        </div>
        <BottomFade />
      </div>

      <Paginate
        initialPage={Number(searchParams.page)}
        itemsCount={count}
        itemsPerPage={itemsPerPage}
      />
    </main>
  );
}
