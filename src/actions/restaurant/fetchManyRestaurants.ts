"use server";
import prisma from "@/lib/prisma";
import {
  PaymentMethodProps,
  RestaurantProps,
  WorkHourProps,
} from "@/types/restaurant";
import { Prisma } from "@prisma/client";

type QueryProps = Prisma.RestaurantFindManyArgs;

interface FetchManyRestaurantsResProps {
  restaurants: RestaurantProps[];
  pages: number;
}

interface FetchManyRestaurantsProps {
  take: number;
  page: number;
  query?: QueryProps;
}

export const fetchManyRestaurants = async ({
  page,
  take,
  query = {},
}: FetchManyRestaurantsProps): Promise<FetchManyRestaurantsResProps> => {
  const count = await prisma.user.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const restaurants = await prisma.restaurant.findMany({
    skip,
    take,
    ...query,
  });

  return {
    restaurants: restaurants.map((restaurant) => ({
      ...restaurant,
      workHours: restaurant.workHours as unknown as WorkHourProps[],
      methods: restaurant.methods as unknown as PaymentMethodProps,
    })),
    pages,
  };
};
