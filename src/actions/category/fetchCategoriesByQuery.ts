"use server";
import prisma from "@/lib/prisma";
import { Category, Prisma } from "@prisma/client";

interface FetchCategoriesByQueryResProps {
  categories: Category[];
  pages: number;
}

interface FetchCategoriesByQueryProps {
  take: number;
  page: number;
  query?: Prisma.CategoryFindManyArgs;
}

export const fetchCategoriesByQuery = async <
  T = FetchCategoriesByQueryResProps
>({
  page,
  take,
  query = {},
}: FetchCategoriesByQueryProps): Promise<T> => {
  const count = await prisma.category.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const categories = await prisma.category.findMany({
    skip,
    take,
    ...query,
  });

  return {
    categories,
    pages,
  } as T;
};
