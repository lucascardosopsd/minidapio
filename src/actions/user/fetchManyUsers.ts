"use server";

import prisma from "@/lib/prisma";

interface FetchManyUsersProps {
  take: number;
  page: number;
}

export const fetchManyUsers = async ({ page, take }: FetchManyUsersProps) => {
  const count = await prisma.user.count();
  const totalPages = Math.round(count / take);

  const skip = page * take;

  console.log(skip);

  const users = prisma.user.findMany({
    skip,
    take,
  });

  return {
    ...users,
    totalPages,
  };
};
