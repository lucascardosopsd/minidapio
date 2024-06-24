"use server";

import prisma from "@/lib/prisma";

interface GetAfiliateProps {
  id?: string;
}

export const fetchAfiliate = async ({ id }: GetAfiliateProps) => {
  return prisma.afiliate.findUnique({ where: { id } });
};
