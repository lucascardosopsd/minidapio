"use server";

import prisma from "@/lib/prisma";
import { Afiliate, Prisma } from "@prisma/client";

interface FetchAfiliatesByQueryProps {
  query: Prisma.AfiliateFindManyArgs;
}

export const fetchAfiliatesByQuery = async ({
  query,
}: FetchAfiliatesByQueryProps): Promise<Afiliate[]> => {
  return await prisma.afiliate.findMany(query);
};
