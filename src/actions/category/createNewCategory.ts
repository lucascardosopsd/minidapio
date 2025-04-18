'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { categoryValidator } from '@/validators/category';

export const createNewCategory = async ({ data }: { data: z.infer<typeof categoryValidator> }) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        title: data.title,
        order: data.order ?? undefined,
        active: data.active,
        restaurantId: data.restaurantId,
      },
    });

    return newCategory;
  } catch (error) {
    console.error(error);
    throw new Error('Error when create category');
  }
};
