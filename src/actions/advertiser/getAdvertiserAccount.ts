"use server";

import prisma from "@/lib/prisma";

export const getAdvertiserAccount = async ({ userId }: { userId: string }) => {
  return await prisma.advertiserAccount.findUnique({
    where: { userId },
  });
};
