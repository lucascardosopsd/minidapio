"use server";

import prisma from "@/lib/prisma";

interface CreateViewProps {
  restaurantId: string;
  adId: string;
}

export const createView = async ({ restaurantId, adId }: CreateViewProps) => {
  return await prisma.view.create({
    data: {
      restaurantId,
      adId,
    },
  });
};
