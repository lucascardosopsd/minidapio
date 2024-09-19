import { useUserSession } from "@/hooks/useUserSession";
import { fetchUserRestaurants } from "@/actions/restaurant/fetchUserRestaurants";
import RestaurantsList from "@/components/restaurant/lists/Restaurants";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { SubscriptionWithPlanProps } from "@/types/plan";
import { planLimits } from "@/constants/planLimits";
import { FullRestaurantNestedProps } from "@/types/restaurant";

interface CustomRestaurantsRes {
  pages: number;
  restaurants: FullRestaurantNestedProps[];
}

interface CustomFetchSubscriptionsByQueryResProps {
  subscriptions: SubscriptionWithPlanProps[];
  pages: number;
}

export default async function Dashboard() {
  const user = await useUserSession();
  const restaurants = await fetchUserRestaurants();

  const { subscriptions } =
    await fetchSubscriptionsByQuery<CustomFetchSubscriptionsByQueryResProps>({
      page: 0,
      take: 10,
      query: {
        where: { userId: user?.id },
        include: {
          Plan: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    });

  const limits = planLimits[subscriptions[0]?.Plan?.alias || "free"];

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <RestaurantsList restaurants={restaurants!} limits={limits} />
    </main>
  );
}
