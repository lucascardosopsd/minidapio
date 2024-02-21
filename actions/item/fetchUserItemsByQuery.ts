"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { Prisma } from "@prisma/client";
import { ItemProps } from "@/types/item";

export type ItemsQuery = Prisma.ItemFindManyArgs;

export const fetchUserItemsByQuery = async (
  query: ItemsQuery
): Promise<ItemProps[]> => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const includeUserQuery = {
    ...query,
    where: {
      ...query.where,
      title: {
        contains: query.where?.title as string,
        mode: "insensitive",
      },
      description: {
        contains: query.where?.description as string,
        mode: "insensitive",
      },
      userId: user.id,
    },
  } satisfies ItemsQuery;

  try {
    return await prisma.item.findMany(includeUserQuery);
  } catch (error) {
    console.log(error);
    throw new Error("Can't fetch items");
  }
};
