"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface GetUserProps {
  query?: Prisma.UserFindManyArgs;
}

export const fetchUserByQuery = async ({ query }: GetUserProps) => {
  if (query) {
    return prisma.user.findMany(query);
  }

  return;
};
