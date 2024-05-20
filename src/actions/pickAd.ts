"use server";
import prisma from "@/lib/prisma";
import { AdProps } from "@/types/ad";

export const pickAd = async ({
  regionId,
  restaurantId,
}: {
  regionId: string;
  restaurantId: string;
}): Promise<AdProps> => {
  const ads = await prisma.ad.findMany({
    where: {
      regionId,
    },
  });

  const randomPos = Math.floor(Math.random() * (ads.length - 0 + 1)) + 0;

  const picked = ads[randomPos];

  await prisma.view.create({
    data: {
      date: new Date(),
      restaurantId: restaurantId,
      adId: picked.id,
    },
  });

  return picked;
};
