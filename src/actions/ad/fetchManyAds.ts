"use server";
import prisma from "@/lib/prisma";
import { Ad, Prisma } from "@prisma/client";

interface FetchManyAdsResProps {
  ads: Ad[];
  pages: number;
}

interface FetchManyAdsProps {
  take: number;
  page: number;
  query?: Prisma.AdFindManyArgs;
}

export const fetchManyAds = async <T = FetchManyAdsResProps>({
  page,
  take,
  query = {},
}: FetchManyAdsProps): Promise<T> => {
  const count = await prisma.afiliate.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const ads = await prisma.ad.findMany({
    skip,
    take,
    ...query,
  });

  return {
    ads,
    pages,
  } as T;
};
