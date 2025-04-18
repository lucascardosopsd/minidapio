'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { categoryValidator } from '@/validators/category';

interface UpdateCategoryProps {
  data: z.infer<typeof categoryValidator>;
  id: string;
}

export const updateCategory = async ({ data, id }: UpdateCategoryProps) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        order: data.order ?? undefined,
        active: data.active,
        restaurantId: data.restaurantId,
      },
    });

    return updatedCategory;
  } catch (error) {
    console.error(error);
    throw new Error('Error when update category');
  }
};
