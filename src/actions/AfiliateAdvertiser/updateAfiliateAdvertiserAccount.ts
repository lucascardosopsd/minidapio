"use server";

import prisma from "@/lib/prisma";
import { afiliateAdvertiserValidator } from "@/validators/afiliateAdvertiser";
import { z } from "zod";

export const updateAfiliateAdvertiserAccount = async ({
  data,
}: {
  data: z.infer<typeof afiliateAdvertiserValidator>;
}) => {
  return prisma.afiliateAdvertiserAccount.create({ data });
};
