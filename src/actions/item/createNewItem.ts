"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";
import { ItemValidator } from "@/validators/item";

export const createNewItem = async (
  data: z.infer<typeof ItemValidator>,
  path?: string
) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.item.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    if (path) revalidatePath(path);
  } catch (error) {
    throw new Error("Can't create new item");
  }
};
