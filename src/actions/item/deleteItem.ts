"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteItem = async (id: string, restaurantId: string) => {
  try {
    await prisma.item.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/restaurant/" + restaurantId);
  } catch (error) {
    throw new Error("Can't delete restaurant");
  }
};
