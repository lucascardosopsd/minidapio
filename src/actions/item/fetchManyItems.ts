"use server";
import prisma from "@/lib/prisma";
import { Item, Prisma } from "@prisma/client";

interface FetchManyItemsResProps {
  items: Item[];
  pages: number;
}

interface FetchManyItemsProps {
  take: number;
  page: number;
  query?: Prisma.ItemFindManyArgs;
}

export const fetchManyItems = async <T = FetchManyItemsResProps>({
  page,
  take,
  query = {},
}: FetchManyItemsProps): Promise<T> => {
  const count = await prisma.afiliate.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const items = await prisma.item.findMany({
    skip,
    take,
    ...query,
  });

  return {
    items,
    pages,
  } as T;
};
