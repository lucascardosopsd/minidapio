"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";

export const deleteRestaurant = async (id: string) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

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
