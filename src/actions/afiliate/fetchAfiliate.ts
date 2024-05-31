"use server";

import prisma from "@/lib/prisma";

interface GetAfiliateProps {
  email?: string;
  id?: string;
}

export const fetchAfiliate = async ({ id }: GetAfiliateProps) => {
  return prisma.afiliate.findUnique({ where: { id } });
};
