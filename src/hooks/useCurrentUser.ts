"use server";

import { User } from "@prisma/client";
import { useClerkUser } from "./userClerkUser";
import prisma from "@/lib/prisma";

export const useCurrentUser = async (): Promise<User | null> => {
  const clerk = await useClerkUser();

  if (!clerk?.id) {
    return null;
  }

  return await prisma.user.findUnique({
    where: { clerkId: clerk.id },
  });
};
