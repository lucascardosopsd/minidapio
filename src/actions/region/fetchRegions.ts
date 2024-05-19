import prisma from "@/lib/prisma";

export const fetchRegions = async () => {
  return await prisma.region.findMany();
};
