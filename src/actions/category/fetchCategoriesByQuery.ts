"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CategoriesWithItemsProps } from "@/types/category";

export type CategoryQuery = Prisma.CategoryFindManyArgs;

export const fetchCategoriesByQuery = async <T = CategoriesWithItemsProps[]>(
  query: CategoryQuery
): Promise<T | CategoriesWithItemsProps[]> => {
  try {
    return await prisma.category.findMany(query);
  } catch (error) {
    throw new Error("Can't fetch restaurants");
  }
};
