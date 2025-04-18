"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteManyItems = async (ids: string[], path?: string) => {
  try {
    await prisma.menuItem.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error when delete items");
  }
};
