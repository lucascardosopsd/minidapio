'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ItemValidator } from '@/validators/item';

interface UpdateManyItemsProps {
  data: z.infer<typeof ItemValidator>;
  ids: string[];
  path?: string;
}

export const updateManyItems = async ({ data, ids, path }: UpdateManyItemsProps) => {
  try {
    await prisma.menuItem.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        name: data.title,
        description: data.description,
        price: data.price ?? 0,
        categoryId: data.categoryId ?? undefined,
        restaurantId: data.restaurantId ?? undefined,
        isAvailable: data.active,
      },
    });

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    throw new Error("Can't update items");
  }
};
