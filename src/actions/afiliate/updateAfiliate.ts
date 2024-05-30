"use server";
import prisma from "@/lib/prisma";
import { Afiliate } from "@prisma/client";

interface updateAfiliateProps {
  id: string;
  data: Partial<Afiliate>;
}

export const updateAfiliate = async ({ id, data }: updateAfiliateProps) => {
  return await prisma.afiliate.update({
    where: { id },
    data,
  });
};
