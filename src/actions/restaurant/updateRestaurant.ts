"use server";
import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateRestaurantProps {
  id: string;
  data: z.infer<typeof restaurantValidator>;
}

export const updateRestaurant = async ({ id, data }: UpdateRestaurantProps) => {
  try {
    await prisma.restaurant.update({
      where: {
        id,
      },
      data,
    });

    revalidatePath("/restaurants");
  } catch (error) {
    console.log(error);
    throw new Error("Can't update restaurant");
  }
};
