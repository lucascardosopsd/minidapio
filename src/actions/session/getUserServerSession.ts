"use server";

import { nextAuthOptions } from "@/lib/authProviders";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { UserProps } from "@/types/user";

export const getUserServerSession = async (): Promise<UserProps | null> => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  return user;
};
