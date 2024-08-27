"use server";
import { nextAuthOptions } from "@/lib/authProviders";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

interface userSessionProps {
  id: string | null;
  email: string | null;
  image: string | null;
  name: string | null;
}

export const useUserSession = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return null;

  return (await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  })) satisfies userSessionProps | null;
};
