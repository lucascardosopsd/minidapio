"use server";

import { advertiserProfile } from "@/validators/advertiserProfile";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const createAdvertiserAccount = async ({
  userId,
  data,
}: {
  userId: string;
  data: z.infer<typeof advertiserProfile>;
}) => {
  return await prisma.advertiserAccount.create({ data });
};
