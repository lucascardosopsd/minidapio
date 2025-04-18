'use server';
import prisma from '@/lib/prisma';
import { MenuItem, Prisma } from '@prisma/client';

export type ItemsQuery = Prisma.MenuItemFindManyArgs;

export const fetchItemsByQuery = async (query: ItemsQuery): Promise<MenuItem[]> => {
  try {
    const items = await prisma.menuItem.findMany({
      ...query,
      where: {
        ...query.where,
      },
      include: {
        ...query.include,
        user: true,
      },
    });
    return items;
  } catch (error) {
    console.error(error);
    throw new Error('Error when fetch items');
  }
};
