import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { fetchManyRestaurants } from "@/actions/restaurant/fetchManyRestaurants";
import { fetchRegions } from "@/actions/region/fetchRegions";
import { Prisma } from "@prisma/client";
import SearchField from "@/components/misc/SearchField";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RestaurantRow from "../tableRows/Restaurant";

interface UserPaginationprops {
  page: number;
  query: Prisma.RestaurantFindManyArgs;
}

const RestaurantsPagination = async ({ page, query }: UserPaginationprops) => {
  const { restaurants, pages } = await fetchManyRestaurants({
    page: page - 1,
    take: 10,
    query,
  });

  const regions = await fetchRegions();

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <div className="flex justify-between w-full gap-5 items-center">
          <p className="text-2xl">Restaurantes</p>
          <SearchField
            keyName="title"
            placeholder="Busque um restaurante"
            inputClassName="w-64"
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Região</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Editar</TableHead>
                <TableHead>Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants.map((restaurant) => (
                <RestaurantRow
                  restaurant={restaurant!}
                  key={restaurant.id}
                  regions={regions}
                  restaurantRegion={
                    regions.filter(
                      (region) => region.id == restaurant.regionId
                    )[0]
                  }
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default RestaurantsPagination;
