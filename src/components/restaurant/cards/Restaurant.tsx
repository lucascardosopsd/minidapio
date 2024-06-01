"use client";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";
import { FaArrowRight, FaRegCopy, FaTrash } from "react-icons/fa6";
import RestaurantForm from "../forms/Restaurant";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { Session } from "@/types/session";
import { toast } from "sonner";
import { deleteRestaurant } from "@/actions/restaurant/deleteRestaurant";
import DeleteModal from "../DeleteModal";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { RegionProps } from "@/types/region";

import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import { updateRestaurant } from "@/actions/restaurant/updateRestaurant";
import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import ReusableModal from "@/components/misc/ReusableModal";
import { RestaurantProps } from "@/types/restaurant";
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
  const [open, setOpen] = useState(false);

  const handleUpdateRestaurant = async (
    data: z.infer<typeof restaurantValidator>
  ) => {
    console.log(data);
    setLoading(true);

    const restaurantExists = await fetchUserRestaurantsByQuery({
      where: {
        id: data.id,
      },
    });

    if (!restaurantExists[0]) {
      setLoading(false);
      return;
    }

    const id = data.id!;

    delete data.id;

    try {
      await updateRestaurant({ id, data });
      toast.success("Restaurante Atualizado");
    } catch (error) {
      toast("Ocorreu um erro.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
          href={`/dashboard/restaurant/${restaurant.id}`}
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
          <ReusableModal
            content={
              <RestaurantForm
                defaultValues={restaurant}
                regions={regions}
                loading={loading}
                onSubmit={handleUpdateRestaurant}
              />
            }
            isOpen={open}
            onOpen={setOpen}
            title="Editar Restaurante"
            trigger="Editar"
            triggerVariant="outline"
            triggerClassName="w-full"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              copyToClipboard(
                `${process.env.NEXT_PUBLIC_HOST}/menu/${session?.id}/${restaurant.slug}`,
                "slug",
                "Link do cardápio copiado!"
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
