import Paginate from "@/components/misc/Pagination";
import { Separator } from "@/components/ui/separator";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import RestaurantCard from "../Cards/Restaurant";
import { fetchRegions } from "@/actions/region/fetchRegions";

interface UserPaginationprops {
  page: number;
}

const RestaurantsPagination = async ({ page }: UserPaginationprops) => {
  const { restaurants, pages } = await fetchManyRestaurants({
    page: page - 1,
    take: 2,
  });

  const regions = await fetchRegions();

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <p className="text-2xl">Restaurantes</p>

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
