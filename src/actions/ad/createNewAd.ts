"use server";
import prisma from "@/lib/prisma";
import { adValidator } from "@/validators/ad";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateNewAdProps {
  data: z.infer<typeof adValidator>;
}

export const createNewAd = async ({ data }: CreateNewAdProps) => {
  await prisma.ad.create({ data });
  revalidatePath("/advertiser/dashboard");
  return;
};
