"use server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

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
