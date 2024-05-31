"use server";

import prisma from "@/lib/prisma";
import { advertiserProfile } from "@/validators/advertiserProfile";
import { z } from "zod";

interface UpdateAdvertiserAccountProps {
  userId?: string;
  accountId?: string;
  data: z.infer<typeof advertiserProfile>;
}

export const updateAdvertiserAccount = async ({
  userId,
  data,
  accountId,
}: UpdateAdvertiserAccountProps) => {
  if (accountId) {
    return await prisma.advertiserAccount.update({
      where: { id: accountId },
      data,
    });
  }

  return await prisma.advertiserAccount.update({
    where: { userId },
    data,
  });
};
