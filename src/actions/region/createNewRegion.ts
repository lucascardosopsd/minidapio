"use server";

import prisma from "@/lib/prisma";
import { regionValidator } from "@/validators/region";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateNewRegionProps {
  data: z.infer<typeof regionValidator>;
}

export const createNewRegion = async ({ data }: CreateNewRegionProps) => {
  await prisma.region.create({ data });
  revalidatePath("/advertiser/dashboard/regions");
  return;
};
