"use server";

import prisma from "@/lib/prisma";
import { RestaurantProps } from "@/types/restaurant";

export const fetchRestaurantById = async (id: string): Promise<RestaurantProps | null> => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!restaurant) return null;

    return {
      id: restaurant.id,
      title: restaurant.name,
      active: restaurant.isActive,
      landline: null,
      whatsapp: null,
      address: restaurant.address,
      methods: restaurant.methods as any,
      workHours: restaurant.workHours as any,
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
    };
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
}; 