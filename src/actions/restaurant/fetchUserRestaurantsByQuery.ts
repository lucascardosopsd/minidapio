"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import {
  PaymentMethodProps,
  RestaurantProps,
  WorkHourProps,
} from "@/types/restaurant";
import { Prisma } from "@prisma/client";

export type RestaurantQuery = Prisma.RestaurantFindFirstArgs;

export const fetchUserRestaurantsByQuery = async (
  query: RestaurantQuery
): Promise<RestaurantProps[]> => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const includeUserQuery = {
    ...query,
    where: {
      ...query.where,
      userId: user.id,
    },
  } satisfies RestaurantQuery;

  try {
    const restaurant = await prisma.restaurant.findMany(includeUserQuery);

    if (!restaurant) {
      return [];
    }

    return restaurant.map((restaurant) => ({
      ...restaurant,
      workHours: restaurant.workHours as unknown as WorkHourProps[],
      methods: restaurant.methods as unknown as PaymentMethodProps,
    }));
  } catch (error) {
    throw new Error("Can't fetch restaurants");
  }
};
