'use server';
import { getCurrentUser } from '@/hooks/useCurrentUser';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export type RestaurantsQuery = Prisma.RestaurantFindManyArgs;

export const fetchUserRestaurantsByQuery = async (query: RestaurantsQuery) => {
  try {
    const user = await getCurrentUser();
    const restaurants = await prisma.restaurant.findMany({
      ...query,
      where: {
        ...query.where,
        ownerId: user.id,
      },
    });

    return restaurants;
  } catch (error) {
    throw new Error("Can't fetch restaurants");
  }
};
