"use server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

interface updateUserProps {
  id: string;
  data: Partial<User>;
}

export const updateUser = async ({ id, data }: updateUserProps) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
