"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteAdProps {
  id: string;
}

export const deleteAd = async ({ id }: DeleteAdProps) => {
  await prisma.ad.delete({ where: { id } });
  revalidatePath("/advertiser/dashboard");
  return;
};
