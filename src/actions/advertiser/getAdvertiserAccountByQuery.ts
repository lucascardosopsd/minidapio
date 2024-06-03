"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface GetAdvertiserAccountProps {
  query: Prisma.AdvertiserAccountFindManyArgs;
}

export const getAdvertiserAccountByQuery = async ({
  query,
}: GetAdvertiserAccountProps) => {
  return await prisma.advertiserAccount.findMany(query);
};
