"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { revalidatePath } from "next/cache";
import { categoryValidator } from "@/validators/category";

export const updateCategory = async (
  data: Partial<z.infer<typeof categoryValidator>>,
  id: string,
  path?: string
) => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    await prisma.category.update({
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
