"use server";
import prisma from "@/lib/prisma";
import { afiliateValidator } from "@/validators/afiliate";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreateNewAfiliate {
  data: z.infer<typeof afiliateValidator>;
}

export const createNewAfiliate = async ({ data }: CreateNewAfiliate) => {
  await prisma.afiliate.create({ data });
  revalidatePath("/advertiser/dashboard/afiliates");
  return;
};
