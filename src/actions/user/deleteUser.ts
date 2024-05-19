"use server";
import prisma from "@/lib/prisma";

interface DeleteUsersProps {
  id: string;
}

export const deleteUser = async ({ id }: DeleteUsersProps) => {
  return await prisma.user.delete({ where: { id } });
};
