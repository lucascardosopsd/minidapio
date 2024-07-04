"use client";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";
import { FaArrowRight, FaTrash } from "react-icons/fa6";
import RestaurantForm from "../forms/Restaurant";
import { ImSpinner, ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { Session } from "@/types/session";
import { toast } from "sonner";
import { deleteRestaurant } from "@/actions/restaurant/deleteRestaurant";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { RegionProps } from "@/types/region";

import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import { updateRestaurant } from "@/actions/restaurant/updateRestaurant";
import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import ReusableModal from "@/components/misc/ReusableModal";
import { RestaurantProps } from "@/types/restaurant";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";
import { createNewRestaurant } from "@/actions/restaurant/createNewRestaurant";
import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import { createNewCategory } from "@/actions/category/createNewCategory";
import { createNewItem } from "@/actions/item/createNewItem";
import ConfirmModal from "../ConfirmModal";
import { EllipsisVertical, Layers2, Link2 } from "lucide-react";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { slugGen } from "@/tools/slugGen";
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
  const pathname = usePathname();
  const [newName, setNewName] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleUpdateRestaurant = async (
    data: z.infer<typeof restaurantValidator>
  ) => {
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

  const handleDuplicateRestaurant = async () => {
    const restaurantExists = await fetchUserRestaurantsByQuery({
      where: {
        title: newName,
      },
    });

    if (restaurantExists[0]) {
      toast.error("O nome do restaurante já existe. Escolha outro.");
      return;
    }

    if (newName.length < 4) {
      toast.error("O nome precisa ser maior");
      return;
    }

    toast.info(
      <p className="flex items-center gap-2">
        duplicando, aguarde <ImSpinner className="animate-spin" />
      </p>
    );

    try {
      const userRestaurants = await fetchRestaurantsByQuery({
        where: {
          userId: restaurant.userId,
        },
      });

      if (userRestaurants.length >= 2) {
        toast.error("Limite de 2 restaurantes atingido");
        setLoading(false);
        return;
      }

      const newRestaurant = await createNewRestaurant({
        title: newName,
        active: restaurant.active,
        activeMenu: restaurant.activeMenu,
        address: restaurant.address,
        color: restaurant.color,
        logo: restaurant.logo,
        methods: restaurant.methods,
        regionId: restaurant.regionId,
        slug: slugGen(newName),
        workHours: restaurant.workHours,
        landline: restaurant.landline,
        linkMaps: restaurant.linkMaps,
        note: restaurant.note,
        whatsapp: restaurant.whatsapp,
      });

      const categories = await fetchUserCategoriesByQuery({
        where: {
          restaurantId: restaurant.id,
        },
        include: {
          items: true,
        },
      });

      categories.forEach(async (category) => {
        const newCategory = await createNewCategory({
          data: {
            order: category.order,
            title: category.title,
            restaurantId: newRestaurant.id,
          },
        });

        category.items?.forEach(async (item) => {
          await createNewItem({
            data: {
              title: item.title,
              description: item.description,
              active: item.active,
              image: item.image,
              highlight: item.highlight,
              order: item.order,
              price: item.price,
              sale: item.sale,
              salePrice: item.salePrice,
              categoryId: newCategory.id,
              restaurantId: newRestaurant.id,
            },
          });
        });
      });

      revalidateRoute({ fullPath: pathname });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao duplicar");
    }
  };

  return (
    <Card className="w-full h-[315px]" key={restaurant.id}>
      <CardContent className="flex flex-col items-center p-5 gap-5">
        <div className="flex flex-col justify-between w-full">
          <p className="line-clamp-1 mb-2 border-b">{restaurant.title}</p>

          <div className="flex gap-2 w-full justify-between">
            <Badge
              variant={restaurant.active ? "default" : "destructive"}
              className="h-5"
            >
              {restaurant.active ? "Ativo" : "Inativo"}
            </Badge>

            <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
              <div>
                <PopoverTrigger>
                  <EllipsisVertical />
                </PopoverTrigger>
              </div>
              <PopoverContent>
                <div
                  className="flex flex-col gap-2 w-full"
                  onClick={() => setPopoverOpen(false)}
                >
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
                    <p className="flex items-center gap-2">
                      Link <Link2 size={16} />
                    </p>
                  </Button>

                  <ConfirmModal
                    action={handleDuplicateRestaurant}
                    dialogTitle="Duplicar Item"
                    triggerText={
                      <p className="flex items-center gap-2">
                        Duplicar <Layers2 size={15} />
                      </p>
                    }
                    dialogDescription={
                      <div className="flex flex-col gap-2 text-foreground">
                        <div className="flex gap-2">
                          <p>Você está duplicando</p>
                          <Badge className="text-center">
                            {restaurant.title}
                          </Badge>
                        </div>

                        <div className="flex flex-col">
                          <p>Novo nome</p>
                          <Input
                            placeholder="Digite o nome da cópia"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                        </div>
                      </div>
                    }
                    triggerVariant="outline"
                    triggerClassName="w-full bg-transparent border border-primary"
                  />

                  <ConfirmModal
                    action={handleDeleteRestaurant}
                    dialogTitle="Deletar Item"
                    triggerText={
                      <p className="flex gap-2 items-center">
                        Apagar <FaTrash />
                      </p>
                    }
                    dialogDescription={
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <p>Você está apagando o restaurante</p>
                          <Badge>{restaurant.title}</Badge>
                        </div>
                      </div>
                    }
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Image
          alt="logo"
          src={restaurant.logo}
          width={0}
          height={0}
          sizes="1000px"
          className="rounded-full h-20 w-20"
        />

        <div className="flex flex-col gap-2 w-full">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
