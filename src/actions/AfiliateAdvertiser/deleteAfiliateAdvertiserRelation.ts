"use server";

import prisma from "@/lib/prisma";

export const deleteAfiliateAdvertiserRelation = async ({
  id,
}: {
  id: string;
}) => {
  return prisma.afiliateAdvertiserAccount.delete({
    where: {
      id,
    },
  });
};
