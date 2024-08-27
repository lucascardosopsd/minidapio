"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteRestaurant = async (id: string) => {
  try {
    await prisma.restaurant.delete({
      where: {
        id,
      },
    });

    revalidatePath("/restaurants");
  } catch (error) {
    throw new Error("Can't delete restaurant");
  }
};
