'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { ItemValidator } from '@/validators/item';

export const createNewItem = async ({ data }: { data: z.infer<typeof ItemValidator> }) => {
  try {
    const newItem = await prisma.menuItem.create({
      data: {
        name: data.title,
        description: data.description ?? undefined,
        price: data.price ?? 0,
        categoryId: data.categoryId ?? '',
        restaurantId: data.restaurantId ?? '',
        userId: data.userId,
        isAvailable: data.active,
      },
    });

    return newItem;
  } catch (error) {
    console.error(error);
    throw new Error('Error when create item');
  }
};
