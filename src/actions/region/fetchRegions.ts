import prisma from "@/lib/prisma";

export const fetchRegions = async () => {
  return prisma.region.findMany();
};
