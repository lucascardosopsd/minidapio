"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ItemValidator } from "@/validators/item";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface CreateNewItemProps {
  data: z.infer<typeof ItemValidator>;
}

export const createNewItem = async ({ data }: CreateNewItemProps) => {
  const user = await useCurrentUser();

  try {
    await prisma.item.create({
      data: {
        ...data,
        userId: user?.id,
      },
    });
  } catch (error) {
    throw new Error("Can't create new item");
  }
};
