"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";

export const deleteItem = async (id: string, restaurantId: string) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.item.delete({
      where: {
        id,
      },
    });

    revalidatePath("/restaurant/" + restaurantId);
  } catch (error) {
    throw new Error("Can't delete restaurant");
  }
};
