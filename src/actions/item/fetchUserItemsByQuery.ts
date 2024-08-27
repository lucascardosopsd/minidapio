"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { Item, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type ItemsQuery = Prisma.ItemFindManyArgs;

interface fetchUserItemsByQueryReturnProps {
  count: number;
  items: Item[];
}

export const fetchUserItemsByQuery = async (
  query: ItemsQuery,
  path?: string
): Promise<fetchUserItemsByQueryReturnProps> => {
  const user = await useUserSession();

  const safeQuery = {
    ...query,
    orderBy: {
      title: "asc",
    },
    where: {
      ...query.where,
      title: query.where?.title && {
        contains: query.where?.title as string,
        mode: "insensitive",
      },
      description: query.where?.description && {
        contains: query.where?.description as string,
        mode: "insensitive",
      },
      price: query.where?.price,
      active: query.where?.active,
      sale: query.where?.sale,
      userId: user?.id,
    },
  } satisfies ItemsQuery;

  try {
    const [count, items] = await prisma.$transaction([
      prisma.item.count(),
      prisma.item.findMany(safeQuery),
    ]);

    if (path) revalidatePath(path);
    return { items, count };
  } catch (error) {
    console.log(error);
    throw new Error("Can't fetch items");
  }
};
