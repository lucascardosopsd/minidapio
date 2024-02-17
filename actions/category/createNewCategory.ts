"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";
import { categoryValidator } from "@/validators/category";

export const createNewCategory = async (
  data: z.infer<typeof categoryValidator>,
  path?: string
) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.category.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    if (path) revalidatePath(path);
  } catch (error) {
    throw new Error("Can't create new restaurant");
  }
};
