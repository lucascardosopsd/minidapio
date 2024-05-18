"use server";

import prisma from "@/lib/prisma";
import { regionValidator } from "@/validators/region";
import { z } from "zod";

interface CreateNewRegionProps {
  data: z.infer<typeof regionValidator>;
}

export const createNewRegion = async ({ data }: CreateNewRegionProps) => {
  return prisma.region.create({ data });
};
