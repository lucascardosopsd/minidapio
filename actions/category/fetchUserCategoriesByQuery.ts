"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { Prisma } from "@prisma/client";
import { CategoriesWithItemsProps } from "@/types/category";

export type CategoryQuery = Prisma.CategoryFindManyArgs;

export const fetchUserCategoriesByQuery = async (
  query: CategoryQuery
): Promise<CategoriesWithItemsProps[]> => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const includeUserQuery = {
    ...query,
    include: {
      items: true,
    },
    where: {
      ...query.where,
      userId: user.id,
    },
  } satisfies CategoryQuery;

  try {
    return await prisma.category.findMany(includeUserQuery);
  } catch (error) {
    throw new Error("Can't fetch restaurants");
  }
};
