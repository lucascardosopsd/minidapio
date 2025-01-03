"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ItemValidator } from "@/validators/item";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface UpdateItemProps {
  id: string;
  data: Partial<z.infer<typeof ItemValidator>>;
}

export const updateItem = async ({ data, id }: UpdateItemProps) => {
  const user = await useCurrentUser();

  try {
    await prisma.item.update({
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
