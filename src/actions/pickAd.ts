"use server";
import prisma from "@/lib/prisma";
import { AdProps } from "@/types/ad";

export const pickAd = async ({
  regionId,
}: {
  regionId: string;
}): Promise<AdProps> => {
  const ads = await prisma.ad.findMany({
    where: {
      regionId,
      active: true,
    },
  });

  const randomPos = Math.floor(Math.random() * (ads.length - 0 + 1)) + 0;

  const picked = ads[randomPos];

  return picked;
};
