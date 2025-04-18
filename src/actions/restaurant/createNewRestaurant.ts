'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { restaurantValidator } from '@/validators/restaurant';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/hooks/useCurrentUser';

interface CreateNewRestaurantProps {
  data: z.infer<typeof restaurantValidator>;
}

export const createNewRestaurant = async ({ data }: CreateNewRestaurantProps) => {
  try {
    const user = await getCurrentUser();
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: data.title,
        description: data.note,
        address: data.address,
        phone: data.landline || '',
        ownerId: user.id,
        userId: user.id,
        isActive: data.active,
        workHours: data.workHours as any,
        methods: data.methods as any,
      },
    });

    revalidatePath('/dashboard/restaurants');

    return newRestaurant;
  } catch (error) {
    throw new Error("Can't create new restaurant");
  }
};
