"use server";
import prisma from "@/lib/prisma";
import {
  PaymentMethodProps,
  RestaurantProps,
  WorkHourProps,
} from "@/types/restaurant";

interface FetchManyRestaurantsResProps {
  restaurants: RestaurantProps[];
  pages: number;
}

interface FetchManyRestaurantsProps {
  take: number;
  page: number;
}

export const fetchManyRestaurants = async ({
  page,
  take,
}: FetchManyRestaurantsProps): Promise<FetchManyRestaurantsResProps> => {
  const count = await prisma.user.count();
  const pages = Math.round(count / take);

  const skip = page * take;

  const restaurants = await prisma.restaurant.findMany({
    skip,
    take,
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
