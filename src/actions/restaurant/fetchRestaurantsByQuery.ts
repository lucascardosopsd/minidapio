"use server";
import prisma from "@/lib/prisma";
import {
  PaymentMethodProps,
  RestaurantProps,
  WorkHourProps,
} from "@/types/restaurant";
import { Prisma } from "@prisma/client";

export type RestaurantQuery = Prisma.RestaurantFindFirstArgs;

export const fetchRestaurantsByQuery = async (
  query: RestaurantQuery
): Promise<RestaurantProps[]> => {
  const includeUserQuery = {
    ...query,
    where: {
      ...query.where,
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
    console.log(error);
    throw new Error("Can't fetch restaurants");
  }
};
