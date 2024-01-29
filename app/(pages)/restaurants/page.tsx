"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { restaurants } from "@/mock/restaurants";
import NewRestaurantSheet from "@/components/sheets/NewRestaurant";

export default function Dashboard() {
  return (
    <main className="flex items-center justify-center h-[calc(100svh-4rem)] gap-8 ">
      <div className="space-y-4 w-full">
        <p>Restaurantes</p>

        <NewRestaurantSheet />

        <Separator className="w-full" />

        <ScrollArea className="h-[65svh] flex-1">
          <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-4 gap-4 pb-4 tablet:pb-0">
            {restaurants.map((restaurant) => (
              <Card className="w-full" key={restaurant.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <p>{restaurant.title}</p>

                    <Badge
                      variant={restaurant.active ? "default" : "destructive"}
                    >
                      {restaurant.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-2">
                    <Image
                      alt="logo"
                      src={restaurant.logo}
                      width={0}
                      height={0}
                      sizes="1000px"
                      className="rounded-full h-20 w-20"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/restaurant/${restaurant.id}`}
                    className="w-full"
                  >
                    <Button
                      variant={restaurant.active ? "default" : "outline"}
                      className="w-full"
                    >
                      Editar
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
