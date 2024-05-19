"use server";

import prisma from "@/lib/prisma";
import { regionValidator } from "@/validators/region";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface UpdateRegionProps {
  id: string;
  data: z.infer<typeof regionValidator>;
}

export const updateRegion = async ({ id, data }: UpdateRegionProps) => {
  await prisma.region.update({ where: { id }, data });

  revalidatePath("/advertiser/dashboard/regions");

  return;
};
