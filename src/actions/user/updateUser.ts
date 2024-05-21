"use server";

import prisma from "@/lib/prisma";
import { userValidatorSchema } from "@/validators/user";
import { z } from "zod";

interface updateUserProps {
  id: string;
  user: z.infer<typeof userValidatorSchema>;
}

export const updateUser = async ({ id, user }: updateUserProps) => {
  return await prisma.user.update({
    where: { id },
    data: { ...user },
  });
};
