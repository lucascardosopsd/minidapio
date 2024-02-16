"use server";

import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import { getUser } from "./getUser";
import prisma from "@/lib/prisma";

export const createNewRestaurant = async (
  data: z.infer<typeof restaurantValidator>,
  userEmail: string
) => {
  const user = await getUser(userEmail);

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
