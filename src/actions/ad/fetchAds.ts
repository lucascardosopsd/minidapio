"use server";
import prisma from "@/lib/prisma";
import { AdProps } from "@/types/ad";
import { Prisma } from "@prisma/client";

interface FetchManyAdsResProps {
  ads: AdProps[];
  pages: number;
}

interface FetchAdsProps {
  take: number;
  page: number;
  query: Prisma.AdFindManyArgs;
}

export const fetchAds = async ({
  take,
  page,
  query,
}: FetchAdsProps): Promise<FetchManyAdsResProps> => {
  const count = await prisma.ad.count();
  const pages = Math.round(count / take);

  const skip = page * take;

  const ads = await prisma.ad.findMany({
    skip,
    take,
    ...query,
  });

  return {
    ads,
    pages,
  };
};
