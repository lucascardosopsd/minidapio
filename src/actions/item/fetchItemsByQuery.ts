"use server";
import prisma from "@/lib/prisma";
import { Item, Prisma } from "@prisma/client";

export type ItemsQuery = Prisma.ItemFindManyArgs;

export const fetchItemsByQuery = async (query: ItemsQuery): Promise<Item[]> => {
  try {
    const items = await prisma.item.findMany(query);

    return items;
  } catch (error) {
    console.log(error);
    throw new Error("Can't fetch items");
  }
};
