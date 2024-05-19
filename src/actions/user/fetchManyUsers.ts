"use server";
import prisma from "@/lib/prisma";
import { UserProps } from "@/types/user";
import { Prisma } from "@prisma/client";

type UserQuery = Prisma.UserFindManyArgs;

interface FetchManyUsersResProps {
  users: UserProps[];
  pages: number;
}

interface FetchManyUsersProps {
  take: number;
  page: number;
  query?: UserQuery;
}

export const fetchManyUsers = async ({
  page,
  take,
  query = {},
}: FetchManyUsersProps): Promise<FetchManyUsersResProps> => {
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
  };
};
