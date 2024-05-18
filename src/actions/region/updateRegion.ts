"use server";

import prisma from "@/lib/prisma";
import { regionValidator } from "@/validators/region";
import { z } from "zod";

interface UpdateRegionProps {
  id: string;
  data: z.infer<typeof regionValidator>;
}

export const updateRegion = async ({ id, data }: UpdateRegionProps) => {
  return prisma.region.update({ where: { id }, data });
};
