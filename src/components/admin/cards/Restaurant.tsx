"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/DeleteModal";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useSearchParams } from "next/navigation";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { RestaurantProps } from "@/types/restaurant";
import { deleteRestaurant } from "@/actions/restaurant/deleteRestaurant";
import ReusableModal from "@/components/misc/ReusableModal";
import RestaurantForm from "@/components/restaurant/forms/Restaurant";
import { RegionProps } from "@/types/region";
import { restaurantValidator } from "@/validators/restaurant";
import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import { z } from "zod";
import { updateRestaurant } from "@/actions/restaurant/updateRestaurant";

interface RestaurantCardProps {
  restaurant: RestaurantProps;
  regions: RegionProps[];
}

const RestaurantCard = ({ restaurant, regions }: RestaurantCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteRestaurant(restaurant.id);

      revalidateRoute({ fullPath: `${pathname}?${params}` });

      toast.success("Restaurante deletado");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

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
      setIsModalOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-5">
          <Avatar>
            <AvatarImage src={restaurant.logo} />
          </Avatar>

          <div className="flex items-center">{restaurant.title}</div>
        </div>

        <div className="flex gap-5">
          <ReusableModal
            title="Editar Restaurante"
            content={
              <div className="flex justify-center w-full">
                <RestaurantForm
                  defaultValues={restaurant}
                  regions={regions}
                  onSubmit={handleUpdateRestaurant}
                  loading={loading}
                />
              </div>
            }
            trigger={<FaPen />}
            isOpen={isModalOpen}
            onOpen={setIsModalOpen}
          />

          <div className="flex gap-5">
            <DeleteModal
              action={handleDelete}
              dialogTitle="Apagar usuário"
              triggerText={<FaTrash />}
              dialogDescription={
                <>
                  <p>
                    Você está apagando o restaurante:{" "}
                    <span className="text-red-500">{restaurant.title}</span>
                  </p>
                  <p>Deseja continuar?</p>
                </>
              }
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default RestaurantCard;
