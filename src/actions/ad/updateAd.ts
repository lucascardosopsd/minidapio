"use server";
import prisma from "@/lib/prisma";
import { AdProps } from "@/types/ad";
import { revalidatePath } from "next/cache";

interface UpdateAdProps {
  id: string;
  data: Partial<AdProps>;
}

export const updateAd = async ({ id, data }: UpdateAdProps) => {
  await prisma.ad.update({ where: { id }, data });
  revalidatePath("/advertiser/dashboard");
  return;
};
