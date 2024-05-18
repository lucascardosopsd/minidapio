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

  return (await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    select: {
      id: true,
      email: true,
      image: true,
      name: true,
    },
  })) satisfies userSessionProps | null;
};
