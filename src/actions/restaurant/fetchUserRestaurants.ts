"use server";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import prisma from "@/lib/prisma";
import { PaymentMethodProps, WorkHourProps } from "@/types/restaurant";

export const fetchUserRestaurants = async () => {
  const user = await useCurrentUser();

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: user?.id,
      },
    });

    return restaurants.map((restaurant) => ({
      ...restaurant,
      workHours: restaurant.workHours as unknown as WorkHourProps[],
      methods: restaurant.methods as unknown as PaymentMethodProps,
    }));
  } catch (error) {
    console.log(error);
    throw new Error("Can't fetch restaurants");
  }
};
