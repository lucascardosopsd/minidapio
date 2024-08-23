import { useUserSession } from "@/hooks/useUserSession";
import { fetchUserRestaurants } from "@/actions/restaurant/fetchUserRestaurants";
import RestaurantsList from "@/components/restaurant/lists/Restaurants";

export default async function Dashboard() {
  const session = await useUserSession();
  const restaurants = await fetchUserRestaurants();

  if (!session) {
    return;
  }

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <RestaurantsList restaurants={restaurants!} session={session!} />
    </main>
  );
}
