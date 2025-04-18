'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { ItemValidator } from '@/validators/item';
import { revalidatePath } from 'next/cache';

interface UpdateItemProps {
  data: z.infer<typeof ItemValidator>;
  id: string;
}

export const updateItem = async ({ data, id }: UpdateItemProps) => {
  try {
    // Map validator fields to Prisma fields
    const updateData = {
      name: data.title,
      description: data.description,
      price: data.price ?? 0,
      categoryId: data.categoryId ?? undefined,
      restaurantId: data.restaurantId ?? undefined,
      userId: data.userId,
      isAvailable: data.active,
    };

    await prisma.menuItem.update({
      where: {
        id,
      },
      data: updateData,
    });

    revalidatePath('/dashboard/restaurant/' + data.restaurantId);
  } catch (error) {
    throw new Error("Can't update item");
  }
};
