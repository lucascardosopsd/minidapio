"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";
import { ItemValidator } from "@/validators/item";

export const updateManyItems = async (
  data: Partial<z.infer<typeof ItemValidator>>,
  ids: string[],
  path?: string
) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.item.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        ...data,
        userId: user.id,
      },
    });

    if (path) revalidatePath(path);
  } catch (error) {
    throw new Error("Can't update items");
  }
};
