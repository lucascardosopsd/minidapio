"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { Prisma } from "@prisma/client";
import { CategoriesWithItemsProps } from "@/types/category";

export type CategoryQuery = Prisma.CategoryFindManyArgs;

export const fetchCategoriesByQuery = async <T = CategoriesWithItemsProps[]>(
  query: CategoryQuery
): Promise<T | CategoriesWithItemsProps[]> => {
  const user = await useUserSession();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    return await prisma.category.findMany(query);
  } catch (error) {
    throw new Error("Can't fetch restaurants");
  }
};
