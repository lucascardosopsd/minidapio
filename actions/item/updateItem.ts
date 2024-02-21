"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";
import { ItemValidator } from "@/validators/item";

export const updateItem = async (
  data: Partial<z.infer<typeof ItemValidator>>,
  id: string,
  path?: string
) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.item.update({
      where: {
        id,
      },
      data: {
        ...data,
        userId: user.id,
      },
    });

    if (path) revalidatePath(path);
  } catch (error) {
    throw new Error("Can't update item");
  }
};
