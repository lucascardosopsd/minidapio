"use client";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";
import { FaArrowRight } from "react-icons/fa6";
import RestaurantForm from "../forms/Restaurant";
import { ImSpinner } from "react-icons/im";
import { useState } from "react";
import { toast } from "sonner";
import { deleteRestaurant } from "@/actions/restaurant/deleteRestaurant";
import { copyToClipboard } from "@/tools/copyToClipboard";

import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import { updateRestaurant } from "@/actions/restaurant/updateRestaurant";
import { fetchUserRestaurantsByQuery } from "@/actions/restaurant/fetchUserRestaurantsByQuery";
import ReusableModal from "@/components/misc/ReusableModal";
import { RestaurantProps } from "@/types/restaurant";
import { fetchCategoriesByQuery } from "@/actions/category/fetchCategoriesByQuery";
import { createNewRestaurant } from "@/actions/restaurant/createNewRestaurant";
import { fetchRestaurantsByQuery } from "@/actions/restaurant/fetchRestaurantsByQuery";
import { createNewCategory } from "@/actions/category/createNewCategory";
import { createNewItem } from "@/actions/item/createNewItem";
import { Copy, Link2, Pen, Trash } from "lucide-react";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { slugGen } from "@/tools/slugGen";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { CategoriesWithItemsProps } from "@/types/category";
interface RestaurantCardProps {
  restaurant: RestaurantProps;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [newName, setNewName] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
      setOpen(false);
    }

    setLoading(false);
  };

  const handleDeleteRestaurant = async () => {
    try {
      await deleteRestaurant(restaurant.id);
      toast("Restaurant excluído.");
    } catch (error) {
      toast("Ocorreu um erro ao excluir.");
      throw new Error("Can't delete restaurant");
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const handleDuplicateRestaurant = async () => {
    setLoading(true);
    try {
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

      const { restaurants } = await fetchRestaurantsByQuery({
        page: 0,
        take: 10,
        query: {
          where: {
            userId: restaurant.userId,
          },
        },
      });

      if (restaurants.length >= 4) {
        toast.error("Limite de 4 restaurantes atingido");
        setLoading(false);
        return;
      }

      const {
        id: id,
        createdAt: createdAt,
        updatedAt: updatedAt,
        ...rest
      } = restaurant;

      const newRestaurant = await createNewRestaurant({
        ...rest,
        title: newName,
        slug: slugGen(newName),
      });

      const { categories } = await fetchCategoriesByQuery<{
        pages: number;
        categories: CategoriesWithItemsProps[];
      }>({
        page: 0,
        take: 10000,
        query: {
          where: {
            restaurantId: restaurant.id,
          },
          include: {
            items: true,
          },
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
          const { id: id, ...rest } = item;

          await createNewItem({
            data: {
              ...rest,
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
    } finally {
      setLoading(false);
      setOpenDuplicateModal(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Card
          className="w-full flex flex-col tablet:flex-row rounded-none rounded-t-lg border-b-0"
          key={restaurant.id}
        >
          <CardHeader className="items-center justify-center border-r">
            <Image
              alt="logo"
              src={restaurant.logo}
              width={0}
              height={0}
              sizes="1000px"
              className="rounded-full h-20 w-20"
            />
          </CardHeader>
          <CardContent className="flex items-center justify-between p-5 gap-5 flex-1">
            <p className="line-clamp-1">{restaurant.title}</p>

            <Badge
              variant={restaurant.active ? "default" : "destructive"}
              className="h-5"
            >
              {restaurant.active ? "Ativo" : "Inativo"}
            </Badge>
          </CardContent>

          <CardFooter className="tablet:border-l flex items-center justify-center tablet:pb-0">
            <Link
              href={`/dashboard/restaurant/${restaurant.id}`}
              className="w-full"
            >
              <Button
                variant={restaurant.active ? "default" : "outline"}
                className="gap-2 w-full tablet:w-min"
              >
                <p>Gerenciar</p>
                <FaArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="flex flex-col tablet:flex-row tablet:justify-evenly tablet:items-center p-5 border rounded-b-lg gap-5 ">
          <Button
            type="button"
            className="w-full"
            onClick={() =>
              copyToClipboard(
                `${process.env.NEXT_PUBLIC_HOST}/menu/${restaurant.id}/${restaurant.slug}`,
                "slug",
                "Link do cardápio copiado!"
              )
            }
          >
            <p className="flex items-center gap-2">
              Link <Link2 />
            </p>
          </Button>

          <ReusableModal
            content={
              <RestaurantForm
                defaultValues={restaurant}
                loading={loading}
                onSubmit={handleUpdateRestaurant}
              />
            }
            isOpen={open}
            onOpen={setOpen}
            title="Editar Restaurante"
            trigger={
              <div className="flex gap-2 items-center">
                Editar <Pen />
              </div>
            }
            triggerVariant="outline"
            triggerClassName="w-full"
          />

          <Button
            onClick={() => setOpenDuplicateModal(true)}
            className="flex gap-2 w-full"
            variant="outline"
          >
            Duplicar <Copy />
          </Button>

          <Button
            onClick={() => setOpenDeleteModal(true)}
            className="flex gap-2 text-red-500 hover:text-red-500 border-red-500 w-full"
            variant="outline"
          >
            Deletar <Trash />
          </Button>
        </div>
      </div>

      {/* Modals */}

      <ReusableDialog
        isOpen={openDuplicateModal}
        onOpen={setOpenDuplicateModal}
        onSubmit={handleDuplicateRestaurant}
        title="Duplicar Item"
        loading={loading}
        content={
          <div className="flex flex-col gap-2 text-foreground">
            <div className="flex gap-2">
              <p>Você está duplicando</p>
              <Badge className="text-center">{restaurant.title}</Badge>
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

      <ReusableDialog
        onOpen={setOpenDeleteModal}
        isOpen={openDeleteModal}
        onSubmit={handleDeleteRestaurant}
        title="Deletar Item"
        submitVariant="destructive"
        loading={loading}
        content={
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <p>Você está apagando o restaurante</p>
              <Badge>{restaurant.title}</Badge>
            </div>
          </div>
        }
      />
    </>
  );
};

export default RestaurantCard;
