"use server";

import prisma from "@/lib/prisma";

interface GetUserProps {
  email: string;
}

export const getUser = async ({ email }: GetUserProps) => {
  return prisma.user.findUnique({ where: { email } });
};
