"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteItem = async (id: string, restaurantId: string) => {
  try {
    await prisma.menuItem.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/restaurant/" + restaurantId);
  } catch (error) {
    console.error(error);
    throw new Error("Error when delete item");
  }
};
