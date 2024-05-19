"use client";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";
import { FaArrowRight, FaRegCopy, FaTrash } from "react-icons/fa6";
import RestaurantSheet from "../modals/Restaurant";
import RestaurantForm from "../forms/Restaurant";
import { RestaurantProps } from "@/types/restaurant";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { Session } from "@/types/session";
import { toast } from "sonner";
import { deleteRestaurant } from "@/actions/restaurant/deleteRestaurant";
import DeleteModal from "../DeleteModal";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { RegionProps } from "@/types/region";

interface RestaurantCardProps {
  restaurant: RestaurantProps;
  session: Session | null;
  regions: RegionProps[];
}

const RestaurantCard = ({
  restaurant,
  session,
  regions,
}: RestaurantCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteRestaurant = async () => {
    try {
      await deleteRestaurant(restaurant.id);
      toast("Restaurant excluído.");
    } catch (error) {
      toast("Ocorreu um erro ao excluir.");
      throw new Error("Can't delete restaurant");
    }
  };

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

        <div className="flex gap-2 w-full">
          <RestaurantSheet
            restaurantForm={
              <RestaurantForm defaultValues={restaurant} regions={regions} />
            }
            sheetTitle="Editar Restaurante"
            triggerText="Editar"
            triggerVariant="outline"
            triggerClassname="w-full"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              copyToClipboard(
                `www.minidapio.com/menu/${session?.id}/${restaurant.slug}`,
                "slug",
                "Link do restaurante copiado!"
              )
            }
          >
            <FaRegCopy className="text-primary" />
          </Button>

          <DeleteModal
            action={handleDeleteRestaurant}
            dialogTitle="Deletar Item"
            triggerText={<FaTrash />}
            dialogDescription={
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p>Você está apagando o restaurante</p>
                  <Badge>{restaurant.title}</Badge>
                </div>
              </div>
            }
            triggerVariant="destructive"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
