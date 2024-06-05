"use server";
import prisma from "@/lib/prisma";
import {
  AdvertiserAccount,
  Prisma,
  AfiliateAdvertiserAccount,
  Afiliate,
} from "@prisma/client";

interface QueryReturnProps extends AfiliateAdvertiserAccount {
  advertiserAccount: AdvertiserAccount;
  afiliate: Afiliate;
}

interface FetchManyAfiliateRelationsResProps {
  afiliateRelations: QueryReturnProps[];
  pages: number;
}

interface FetchManyAfiliateRelationsProps {
  take: number;
  page: number;
  query?: Prisma.AfiliateAdvertiserAccountFindManyArgs;
}

export const fetchManyAfiliateRelations = async ({
  page,
  take,
  query = {},
}: FetchManyAfiliateRelationsProps): Promise<FetchManyAfiliateRelationsResProps> => {
  const count = await prisma.afiliateAdvertiserAccount.count({
    where: query.where,
  });
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const afiliateRelations = await prisma.afiliateAdvertiserAccount.findMany({
    skip,
    take,
    ...query,
    include: {
      ...query.include,
      advertiserAccount: true,
      afiliate: true,
    },
  });

  return {
    afiliateRelations,
    pages,
  };
};
