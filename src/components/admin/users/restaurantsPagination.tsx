import Paginate from "@/components/misc/Pagination";
import { Separator } from "@/components/ui/separator";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import RestaurantCard from "../Cards/Restaurant";
import { fetchRegions } from "@/actions/region/fetchRegions";
import { Prisma } from "@prisma/client";
import SearchField from "@/components/misc/SearchField";

interface UserPaginationprops {
  page: number;
  query: Prisma.RestaurantFindManyArgs;
}

const RestaurantsPagination = async ({ page, query }: UserPaginationprops) => {
  const { restaurants, pages } = await fetchManyRestaurants({
    page: page - 1,
    take: 2,
    query,
  });

  const regions = await fetchRegions();

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <div className="flex justify-between w-full gap-5 items-center">
          <p className="text-2xl">Restaurantes</p>
          <SearchField keyName="title" placeholder="Busque um restaurante" />
        </div>

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              restaurant={restaurant}
              key={restaurant.id}
              regions={regions}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default RestaurantsPagination;
