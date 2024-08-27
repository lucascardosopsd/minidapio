"use server";
import { nextAuthOptions } from "@/lib/authProviders";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export const useUserSession = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return null;

  return (await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  })) satisfies User | null;
};
