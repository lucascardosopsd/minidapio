"use server";
import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";
import { Restaurant } from "@prisma/client";

export const createNewRestaurant = async (
  data: z.infer<typeof restaurantValidator>
): Promise<Restaurant> => {
  const user = await useUserSession();

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
