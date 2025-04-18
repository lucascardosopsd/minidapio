"use server";
import prisma from "@/lib/prisma";
import {
  PaymentMethodProps,
  RestaurantProps,
  WorkHourProps,
} from "@/types/restaurant";
import { Prisma } from "@prisma/client";

interface FetchManyRestaurantsResProps {
  restaurants: RestaurantProps[];
  pages: number;
}

interface FetchManyRestaurantsProps {
  take: number;
  page: number;
  query?: Prisma.RestaurantFindManyArgs;
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
      id: restaurant.id,
      title: restaurant.name,
      active: restaurant.isActive,
      landline: null,
      whatsapp: null,
      address: restaurant.address,
      methods: restaurant.methods as unknown as PaymentMethodProps,
      workHours: restaurant.workHours as unknown as WorkHourProps[],
      logo: "",
      color: "",
      linkMaps: null,
      note: restaurant.description,
      activeMenu: true,
      slug: "",
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
      userId: restaurant.userId,
      state: "",
      province: "",
    })),
    pages,
  };
};
