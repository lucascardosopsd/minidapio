"use server";
import prisma from "@/lib/prisma";
import { AdProps } from "@/types/ad";

interface FetchManyAdsResProps {
  ads: AdProps[];
  pages: number;
}

interface FetchAdsProps {
  take: number;
  page: number;
}

export const fetchAds = async ({
  take,
  page,
}: FetchAdsProps): Promise<FetchManyAdsResProps> => {
  const count = await prisma.ad.count();
  const pages = Math.round(count / take);

  const skip = page * take;

  const ads = await prisma.ad.findMany({
    skip,
    take,
  });

  return {
    ads,
    pages,
  };
};
