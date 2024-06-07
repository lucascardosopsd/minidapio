"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { categoryValidator } from "@/validators/category";

export const createNewCategory = async ({
  data,
}: {
  data: z.infer<typeof categoryValidator>;
}) => {
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
  } catch (error) {
    throw new Error("Can't create new restaurant");
  }
};
