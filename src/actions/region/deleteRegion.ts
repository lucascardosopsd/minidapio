"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteRegionProps {
  id: string;
}

export const deleteRegion = async ({ id }: DeleteRegionProps) => {
  await prisma.region.delete({ where: { id } });

  revalidatePath("/advertiser/dashboard/regions");
  return;
};
