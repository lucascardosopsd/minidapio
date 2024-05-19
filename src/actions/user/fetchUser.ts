"use server";

import prisma from "@/lib/prisma";

interface GetUserProps {
  email: string;
}

export const fetchUser = async ({ email }: GetUserProps) => {
  return prisma.user.findUnique({ where: { email } });
};
