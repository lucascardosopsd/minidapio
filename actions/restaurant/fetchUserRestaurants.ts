"use server";
import prisma from "@/lib/prisma";
import { useUserSession } from "@/hooks/useUserSession";
import { PaymentMethodProps, WorkHourProps } from "@/types/restaurant";

export const fetchUserRestaurants = async () => {
  const user = await useUserSession();

  if (!user?.id) {
    throw new Error("User not found");
  }

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: user.id,
      },
    });

    return restaurants.map((restaurant) => ({
      ...restaurant,
      workHours: restaurant.workHours as unknown as WorkHourProps[],
      methods: restaurant.methods as unknown as PaymentMethodProps,
    }));
  } catch (error) {
    throw new Error("Can't fetch restaurants");
  }
};
