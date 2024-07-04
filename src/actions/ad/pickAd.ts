"use server";
import prisma from "@/lib/prisma";
import { Ad } from "@prisma/client";
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
    const random = Math.floor(Math.random() * (ads.length - 0 + 1) + 0);

    const ad = ads[random];

    const hasPaid = !!moment().diff(
      moment(ad?.AdvertiserAccount?.payments[0]?.createdAt, "months", true)
    );

    if (hasPaid) picked = ad;
  }

  return picked!;
};
