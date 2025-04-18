'use server';
import prisma from '@/lib/prisma';
import { MenuItem, Prisma } from '@prisma/client';

interface FetchManyItemsResProps {
  items: MenuItem[];
  count: number;
}

export const fetchManyItems = async (
  query: Prisma.MenuItemFindManyArgs
): Promise<FetchManyItemsResProps> => {
  try {
    // Ensure we include the user relationship
    const safeQuery = {
      ...query,
      include: {
        ...query.include,
        user: true,
      },
    };

    const [items, count] = await prisma.$transaction([
      prisma.menuItem.findMany(safeQuery),
      prisma.menuItem.count({
        where: query.where,
      }),
    ]);

    return {
      items,
      count,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error when fetch items');
  }
};
