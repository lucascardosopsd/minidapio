"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ItemValidator } from "@/validators/item";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const updateManyItems = async (
  data: Partial<z.infer<typeof ItemValidator>>,
  ids: string[],
  path?: string
) => {
  const user = await useCurrentUser();

  try {
    await prisma.item.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        ...data,
        userId: user?.id,
      },
    });

    if (path) revalidatePath(path);
  } catch (error) {
    throw new Error("Can't update items");
  }
};
