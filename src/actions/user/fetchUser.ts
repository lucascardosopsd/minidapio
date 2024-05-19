"use server";

import prisma from "@/lib/prisma";

interface GetUserProps {
  email?: string;
  id?: string;
}

export const fetchUser = async ({ email, id }: GetUserProps) => {
  if (email) return prisma.user.findUnique({ where: { email } });

  return prisma.user.findUnique({ where: { id } });
};
