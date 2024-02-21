"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";

export const deleteManyItems = async (ids: string[], path?: string) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.item.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (path) revalidatePath(path);
  } catch (error) {
    throw new Error("Can't delete items");
  }
};
