import { useUserSession } from "@/hooks/useUserSession";
import { fetchUserRestaurants } from "@/actions/restaurant/fetchUserRestaurants";
import { fetchRegions } from "@/actions/region/fetchRegions";
import RestaurantsList from "@/components/restaurant/lists/Restaurants";

export default async function Dashboard() {
  const session = await useUserSession();
  const restaurants = await fetchUserRestaurants();
  const regions = await fetchRegions();

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <div className="space-y-4 w-full">
        <p>Restaurantes</p>
      </div>

      <RestaurantsList
        regions={regions}
        restaurants={restaurants!}
        session={session!}
      />
    </main>
  );
}
