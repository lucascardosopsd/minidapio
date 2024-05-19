"use server";
import prisma from "@/lib/prisma";
import { AdProps } from "@/types/ad";
import { revalidatePath } from "next/cache";

export const fetchAds = async (): Promise<AdProps[]> => {
  const ads = await prisma.ad.findMany();
  revalidatePath("/advertiser/dashboard");
  return ads;
};
