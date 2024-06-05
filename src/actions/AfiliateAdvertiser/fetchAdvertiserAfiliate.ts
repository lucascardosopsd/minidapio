"use server";

import prisma from "@/lib/prisma";

export const fetchAfiliateAdvertiserRelations = async ({
  advertiserId,
}: {
  advertiserId: string;
}) => {
  return prisma.afiliateAdvertiserAccount.findFirst({
    where: {
      advertiserAccountId: advertiserId,
    },
  });
};
