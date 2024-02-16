"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa6";
import RestaurantSheet from "../sheets/Restaurant";
import RestaurantForm from "../forms/Restaurant";
import { RestaurantProps } from "@/types/restaurant";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { Session } from "@/types/session";

interface RestaurantCardProps {
  restaurant: RestaurantProps;
  session: Session | null;
}

const RestaurantCard = ({ restaurant, session }: RestaurantCardProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <Card className="w-full" key={restaurant.id}>
      <CardHeader>
        <div className="flex justify-between">
          <p>{restaurant.title}</p>

          <Badge variant={restaurant.active ? "default" : "destructive"}>
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
      <CardFooter className="flex flex-col gap-2">
        <Link
          href={`/restaurant/${restaurant.id}`}
          className="w-full space-y-4"
        >
          <Button
            variant={restaurant.active ? "default" : "outline"}
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setLoading(true)}
          >
            {!loading ? (
              <>
                <p>Gerenciar</p>
                <FaArrowRight />
              </>
            ) : (
              <ImSpinner2 className="animate-spin" size={20} />
            )}
          </Button>
        </Link>

        <RestaurantSheet
          restaurantForm={
            <RestaurantForm defaultValues={restaurant} session={session} />
          }
          sheetTitle="Editar Restaurant"
          triggerText="Editar"
          triggerVariant="outline"
          triggerClassname="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
