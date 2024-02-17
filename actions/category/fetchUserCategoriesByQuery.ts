"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { Prisma } from "@prisma/client";
import { CategoryProps } from "@/types/category";

export type CategoryQuery = Prisma.CategoryFindFirstArgs;

export const fetchUserCategoriesByQuery = async (
  query: CategoryQuery
): Promise<CategoryProps[]> => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const includeUserQuery = {
    ...query,
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
