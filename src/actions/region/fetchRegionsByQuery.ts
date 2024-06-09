import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const fetchRegionsByQuery = async ({
  query,
}: {
  query: Prisma.RegionFindManyArgs;
}) => {
  return await prisma.region.findMany(query);
};
