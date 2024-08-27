"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteManyItems = async (ids: string[], path?: string) => {
  try {
    await prisma.item.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (path) revalidatePath(path);
  } catch (error) {
    throw new Error("Can't delete items");
  }
};
