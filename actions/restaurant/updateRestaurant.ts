"use server";
import { restaurantValidator } from "@/validators/restaurant";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";

export const updateRestaurant = async (
  data: z.infer<typeof restaurantValidator>
) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.restaurant.update({
      where: {
        id: data.id!,
      },
      data,
    });

    revalidatePath("/restaurants");
  } catch (error) {
    throw new Error("Can't update restaurant");
  }
};
