"use server";
import prisma from "@/lib/prisma";
import { adValidator } from "@/validators/ad";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface UpdateAdProps {
  id: string;
  data: z.infer<typeof adValidator>;
}

export const updateAd = async ({ id, data }: UpdateAdProps) => {
  await prisma.ad.update({ where: { id }, data });
  revalidatePath("/advertiser/dashboard");
  return;
};
