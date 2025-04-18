import { Metadata } from "next";
import { getCurrentUser } from "@/hooks/useCurrentUser";
import { redirect } from "next/navigation";
import { RestaurantList } from "@/components/restaurant/RestaurantList";
import { fetchUserRestaurants } from "@/actions/restaurant/fetchUserRestaurants";
import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { planLimits } from "@/constants/planLimits";
import { SubscriptionWithPlanProps } from "@/types/plan";

interface CustomFetchSubscriptionsByQueryResProps {
  subscriptions: SubscriptionWithPlanProps[];
  pages: number;
}

export const metadata: Metadata = {
  title: "Restaurantes",
  description: "Gerencie seus restaurantes",
};

const RestaurantsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const restaurants = await fetchUserRestaurants();

  const mappedRestaurants = restaurants.map(restaurant => ({
    ...restaurant,
    title: restaurant.name,
    active: restaurant.isActive,
    landline: null,
    whatsapp: null,
    logo: "",
    color: "",
    linkMaps: null,
    note: null,
    activeMenu: true,
    slug: restaurant.name.toLowerCase().replace(/\s+/g, '-'),
    state: "",
    province: ""
  }));

  const { subscriptions } =
    await fetchSubscriptionsByQuery<CustomFetchSubscriptionsByQueryResProps>({
      page: 0,
      take: 10,
      query: {
        where: { userId: user?.id },
        include: {
          plan: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    });

  const limits = planLimits[subscriptions[0]?.Plan?.alias || "free"]!;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Restaurantes</h1>
        <p className="text-muted-foreground">
          Gerencie seus restaurantes e cardápios
        </p>
      </div>

      <RestaurantList restaurants={mappedRestaurants} limits={limits} />
    </div>
  );
};

export default RestaurantsPage;
