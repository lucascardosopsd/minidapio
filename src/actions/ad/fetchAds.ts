"use server";
import prisma from "@/lib/prisma";
import { Ad, Prisma } from "@prisma/client";

interface FetchManyAdsResProps {
  ads: Ad[];
  pages: number;
}

interface FetchAdsProps {
  take: number;
  page: number;
  query?: Prisma.AdFindManyArgs;
}

export const fetchAds = async ({
  take,
  page,
  query,
}: FetchAdsProps): Promise<FetchManyAdsResProps> => {
  const count = await prisma.ad.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const ads = await prisma.ad.findMany({
    orderBy: {
      title: "asc",
    },
    skip,
    take,
    ...query,
  });

  ads.sort((a, b) =>
    a.active && !b.active ? -1 : !a.active && b.active ? 1 : 0
  );

  return {
    ads,
    pages,
  };
};
