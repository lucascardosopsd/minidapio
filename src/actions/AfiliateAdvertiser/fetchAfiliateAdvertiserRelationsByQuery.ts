"use server"

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const fetchAfiliateAdvertiserRelationsByQuery = async ({
  query,
}: {
  query: Prisma.AfiliateAdvertiserAccountFindManyArgs;
}) => {
  return prisma.afiliateAdvertiserAccount.findMany(query);
};
