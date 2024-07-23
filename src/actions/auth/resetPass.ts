"use server";

import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface ResetPassProps {
  token: string;
  password: string;
}

export const resetPass = async ({ token, password }: ResetPassProps) => {
  const decoded = jwt.verify(token, process.env.SECRET!) as { id: string };

  const userId = decoded.id;

  const user = prisma.user.findFirst({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });
};
