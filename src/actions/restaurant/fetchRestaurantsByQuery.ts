"use server";
import prisma from "@/lib/prisma";
import { RestaurantProps } from "@/types/restaurant";
import { Prisma } from "@prisma/client";

interface FetchRestaurantsByQueryResProps {
  restaurants: RestaurantProps[];
  pages: number;
}

interface FetchRestaurantsByQueryProps {
  take: number;
  page: number;
  query?: Prisma.RestaurantFindManyArgs;
}

export const fetchRestaurantsByQuery = async <
  T = FetchRestaurantsByQueryResProps
>({
  page,
  take,
  query = {},
}: FetchRestaurantsByQueryProps): Promise<T> => {
  const count = await prisma.user.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const restaurants = await prisma.restaurant.findMany({
    skip,
    take,
    ...query,
  });

  return {
    restaurants,
    pages,
  } as T;
};
