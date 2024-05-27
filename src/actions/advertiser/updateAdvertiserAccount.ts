"use server";

import prisma from "@/lib/prisma";
import { advertiserProfile } from "@/validators/advertiserProfile";
import { z } from "zod";

export const updateAdvertiserAccount = async ({
  userId,
  data,
}: {
  userId: string;
  data: z.infer<typeof advertiserProfile>;
}) => {
  return await prisma.advertiserAccount.update({
    where: { userId },
    data,
  });
};
