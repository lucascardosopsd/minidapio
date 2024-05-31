"use server";
import prisma from "@/lib/prisma";
import {
  AdvertiserAccount,
  Prisma,
  User,
  AfiliateAdvertiserAccount,
} from "@prisma/client";

interface AdvertiserReturn extends AdvertiserAccount {
  user: User;
  AfiliateAdvertiserAccount: AfiliateAdvertiserAccount[];
}

interface FetchManyAdvertisersResProps {
  advertisers: AdvertiserReturn[];
  pages: number;
}

interface FetchManyAdvertisersProps {
  take: number;
  page: number;
  query?: Prisma.AdvertiserAccountFindManyArgs;
}

export const fetchManyAdvertisers = async ({
  page,
  take,
  query = {},
}: FetchManyAdvertisersProps): Promise<FetchManyAdvertisersResProps> => {
  const count = await prisma.advertiserAccount.count({
    where: query.where,
  });
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const advertisers = await prisma.advertiserAccount.findMany({
    skip,
    take,
    ...query,
    include: {
      user: true,
      AfiliateAdvertiserAccount: true,
    },
  });

  return {
    advertisers,
    pages,
  };
};
