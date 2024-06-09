"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { ItemValidator } from "@/validators/item";

interface CreateNewItemProps {
  data: z.infer<typeof ItemValidator>;
}

export const createNewItem = async ({ data }: CreateNewItemProps) => {
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
  } catch (error) {
    throw new Error("Can't create new item");
  }
};
