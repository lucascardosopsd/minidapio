"use server";
import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Restaurant } from "@prisma/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const createNewRestaurant = async (
  data: z.infer<typeof restaurantValidator>
): Promise<Restaurant> => {
  const user = await useCurrentUser();

  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        ...data,
        userId: user?.id,
      },
    });

    revalidatePath("/restaurants");

    return newRestaurant;
  } catch (error) {
    throw new Error("Can't create new restaurant");
  }
};
