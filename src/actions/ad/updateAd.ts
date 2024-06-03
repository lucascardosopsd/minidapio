"use server";
import prisma from "@/lib/prisma";
import { Ad } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateAdProps {
  id: string;
  data: Partial<Ad>;
}

export const updateAd = async ({ id, data }: UpdateAdProps) => {
  await prisma.ad.update({ where: { id }, data });
  revalidatePath("/advertiser/dashboard");
  return;
};
