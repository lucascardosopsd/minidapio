"use server";

import prisma from "@/lib/prisma";

export const getUser = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
