"use server";
import { nextAuthOptions } from "@/lib/authProviders";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const useUserSession = async () => {
  const session = await getServerSession(nextAuthOptions);

  return await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    select: {
      id: true,
      email: true,
      image: true,
      name: true,
    },
  });
};
