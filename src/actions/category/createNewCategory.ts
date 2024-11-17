"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { categoryValidator } from "@/validators/category";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const createNewCategory = async ({
  data,
}: {
  data: z.infer<typeof categoryValidator>;
}) => {
  const user = await useCurrentUser();

  try {
    const newCategory = await prisma.category.create({
      data: {
        ...data,
        userId: user?.id,
      },
    });

    return newCategory;
  } catch (error) {
    throw new Error("Can't create new restaurant");
  }
};
