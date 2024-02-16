import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import RestaurantForm from "@/components/forms/Restaurant";
import RestaurantSheet from "@/components/sheets/Restaurant";
import RestaurantCard from "@/components/cards/Restaurant";
import { useUserSession } from "@/hooks/useUserSession";
import { fetchUserRestaurants } from "@/actions/fetchUserRestaurants";

export default async function Dashboard() {
  const session = await useUserSession();
  const restaurants = await fetchUserRestaurants();

  return (
    <main className="flex items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <div className="space-y-4 w-full">
        <p>Restaurantes</p>

        <div>
          <RestaurantSheet
            restaurantForm={<RestaurantForm session={session} />}
            sheetTitle="Novo Restaurante"
            triggerText="Novo Restaurante"
            triggerVariant="default"
            triggerClassname="w-full tablet:w-auto"
          />
        </div>

        <Separator className="w-full" />

        <ScrollArea className="h-[65svh] flex-1">
          {restaurants.length && (
            <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-4 gap-4 pb-4 tablet:pb-0">
              {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant!} session={session} />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </main>
  );
}
