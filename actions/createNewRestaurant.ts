"use server";
import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";

export const createNewRestaurant = async (
  data: z.infer<typeof restaurantValidator>
) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.restaurant.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
  } catch (error) {
    throw new Error("Can't create new restaurant");
  }
};
