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
      title: query.where?.title && {
        contains: String(query.where?.title),
        mode: "insensitive",
      },
      description: query.where?.description && {
        contains: String(query.where?.description),
        mode: "insensitive",
      },
      price: query.where?.price && Number(query.where?.price),
      active:
        query.where?.active && String(query.where?.active) === "true"
          ? true
          : false,
      sale:
        query.where?.sale && String(query.where?.sale) === "true"
          ? true
          : false,
      userId: user.id,
    },
  } satisfies ItemsQuery;

  try {
    return await prisma.item.findMany(includeUserQuery);
  } catch (error) {
    throw new Error("Can't fetch items");
  }
};
