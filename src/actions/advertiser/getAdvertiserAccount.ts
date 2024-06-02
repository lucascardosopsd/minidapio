"use server";

import prisma from "@/lib/prisma";

interface GetAdvertiserAccountProps {
  userId?: string;
  advertiserId?: string;
}

export const getAdvertiserAccount = async ({
  userId,
  advertiserId,
}: GetAdvertiserAccountProps) => {
  if (userId) {
    return await prisma.advertiserAccount.findUnique({
      where: { userId },
    });
  }

  if (advertiserId) {
    return await prisma.advertiserAccount.findUnique({
      where: { id: advertiserId },
    });
  }
};
