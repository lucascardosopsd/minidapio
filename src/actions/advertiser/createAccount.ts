"use server";

import { advertiserProfile } from "@/validators/advertiserProfile";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const createAdvertiserAccount = async ({
  data,
}: {
  data: z.infer<typeof advertiserProfile>;
}) => {
  await prisma.advertiserAccount.create({ data });
};
