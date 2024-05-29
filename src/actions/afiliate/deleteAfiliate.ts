"use server";
import prisma from "@/lib/prisma";

interface DeleteAfiliateProps {
  id: string;
}

export const deleteUser = async ({ id }: DeleteAfiliateProps) => {
  return await prisma.afiliate.delete({ where: { id } });
};
