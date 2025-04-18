'use server';
import { getCurrentUser } from '@/hooks/useCurrentUser';
import prisma from '@/lib/prisma';
import { MenuItem, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export type ItemsQuery = Prisma.MenuItemFindManyArgs;

interface fetchUserItemsByQueryReturnProps {
  count: number;
  items: MenuItem[];
}

export const fetchUserItemsByQuery = async (
  query: ItemsQuery,
  path?: string
): Promise<fetchUserItemsByQueryReturnProps> => {
  const user = await getCurrentUser();

  const safeQuery = {
    ...query,
    orderBy: {
      name: 'asc',
    },
    where: {
      ...query.where,
      userId: user?.id,
      name: query.where?.name && {
        contains: query.where?.name as string,
        mode: 'insensitive',
      },
      description: query.where?.description && {
        contains: query.where?.description as string,
        mode: 'insensitive',
      },
      price: query.where?.price,
      isAvailable: query.where?.isAvailable,
    },
  } satisfies ItemsQuery;

  try {
    const [count, items] = await prisma.$transaction([
      prisma.menuItem.count({ where: { userId: user?.id } }),
      prisma.menuItem.findMany(safeQuery),
    ]);

    if (path) revalidatePath(path);
    return { items, count };
  } catch (error) {
    console.log(error);
    throw new Error("Can't fetch items");
  }
};
