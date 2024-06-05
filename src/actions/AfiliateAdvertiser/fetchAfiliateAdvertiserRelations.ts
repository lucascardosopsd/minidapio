"use server";

import prisma from "@/lib/prisma";

export const fetchAfiliateAdvertiserRelations = async ({
  afiliateId,
}: {
  afiliateId: string;
}) => {
  return prisma.afiliateAdvertiserAccount.findMany({
    where: {
      afiliateId,
    },
  });
};
