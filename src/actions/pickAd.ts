"use server";
import prisma from "@/lib/prisma";
import { Ad } from "@prisma/client";
import { adsProbabilities } from "@/constants/adsProbabilities";
import moment from "moment";

export const pickAd = async ({
  regionId,
}: {
  regionId: string;
}): Promise<Ad> => {
  const ads = await prisma.ad.findMany({
    where: {
      regionId,
      active: true,
    },
    include: {
      AdvertiserAccount: {
        include: {
          payments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  let picked = null;

  while (!picked) {
    ads.forEach((ad) => {
      const random = Math.random();
      if (random < adsProbabilities[ad?.AdvertiserAccount?.plan!]) {
        const hasPaid = !!moment().diff(
          moment(ad.AdvertiserAccount?.payments[0]?.createdAt, "months", true)
        );

        if (hasPaid) picked = ad;
      }
    });
  }

  return picked!;
};
