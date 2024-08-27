import { useUserSession } from "@/hooks/useUserSession";
import { fetchUserRestaurants } from "@/actions/restaurant/fetchUserRestaurants";
import RestaurantsList from "@/components/restaurant/lists/Restaurants";
import { fetchUser } from "@/actions/user/fetchUser";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { SubscriptionWithPlanProps } from "@/types/plan";
import { planLimits } from "@/constants/planLimits";

interface CustomFetchSubscriptionsByQueryResProps {
  subscriptions: SubscriptionWithPlanProps[];
  pages: number;
}

export default async function Dashboard() {
  const session = await useUserSession();
  const restaurants = await fetchUserRestaurants();

  if (!session) {
    return;
  }

  const user = await fetchUser({ email: session.email! });

  const { subscriptions } =
    await fetchSubscriptionsByQuery<CustomFetchSubscriptionsByQueryResProps>({
      page: 0,
      take: 1,
      query: {
        where: { userId: user?.id },
        include: {
          Plan: true,
        },
      },
    });

  const limits = planLimits[subscriptions[0].Plan.alias];

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <RestaurantsList
        restaurants={restaurants!}
        session={session!}
        limits={limits}
      />
    </main>
  );
}
