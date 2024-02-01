"use client";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { restaurants } from "@/mock/restaurants";
import RestaurantForm from "@/components/forms/Restaurant";
import RestaurantSheet from "@/components/sheets/Restaurant";
import RestaurantCard from "@/components/cards/Restaurant";

export default function Dashboard() {
  return (
    <main className="flex items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <div className="space-y-4 w-full">
        <p>Restaurantes</p>

        <div className="max-w-[200px]">
          <RestaurantSheet
            restaurantForm={<RestaurantForm />}
            sheetTitle="Novo Restaurante"
            triggerText="Novo Restaurante"
            triggerVariant="default"
          />
        </div>

        <Separator className="w-full" />

        <ScrollArea className="h-[65svh] flex-1">
          <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-4 gap-4 pb-4 tablet:pb-0">
            {restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
