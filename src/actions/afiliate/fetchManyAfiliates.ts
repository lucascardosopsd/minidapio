"use server";
import prisma from "@/lib/prisma";
import { Afiliate, Prisma } from "@prisma/client";

interface FetchManyAfiliatesResProps {
  afiliates: Afiliate[];
  pages: number;
}

interface FetchManyAfiliatesProps {
  take: number;
  page: number;
  query?: Prisma.AfiliateFindManyArgs;
}

export const fetchManyAfiliates = async ({
  page,
  take,
  query = {},
}: FetchManyAfiliatesProps): Promise<FetchManyAfiliatesResProps> => {
  const count = await prisma.afiliate.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const afiliates = await prisma.afiliate.findMany({
    skip,
    take,
    ...query,
  });

  return {
    afiliates,
    pages,
  };
};
