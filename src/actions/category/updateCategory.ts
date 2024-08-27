"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { categoryValidator } from "@/validators/category";

interface UpdateCategoryProps {
  data: z.infer<typeof categoryValidator>;
  id: string;
}

export const updateCategory = async ({ data, id }: UpdateCategoryProps) => {
  const user = await useUserSession();

  try {
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        ...data,
        userId: user?.id,
      },
    });
  } catch (error) {
    throw new Error("Can't update item");
  }
};
