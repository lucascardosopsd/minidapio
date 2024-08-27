"use server";
import prisma from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

interface FetchUsersByQueryResProps {
  users: User[];
  pages: number;
}

interface FetchUsersByQueryProps {
  take: number;
  page: number;
  query?: Prisma.UserFindManyArgs;
}

export const fetchUsersByQuery = async <T = FetchUsersByQueryResProps>({
  page,
  take,
  query = {},
}: FetchUsersByQueryProps): Promise<T> => {
  const count = await prisma.user.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const users = await prisma.user.findMany({
    skip,
    take,
    ...query,
  });

  return {
    users,
    pages,
  } as T;
};
