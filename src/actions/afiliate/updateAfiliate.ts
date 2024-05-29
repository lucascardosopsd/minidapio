"use server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

interface updateAfiliateProps {
  id: string;
  data: Partial<User>;
}

export const updateAfiliate = async ({ id, data }: updateAfiliateProps) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
