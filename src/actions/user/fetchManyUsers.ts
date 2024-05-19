"use server";
import prisma from "@/lib/prisma";
import { UserProps } from "@/types/user";

interface FetchManyUsersResProps {
  users: UserProps[];
  pages: number;
}

interface FetchManyUsersProps {
  take: number;
  page: number;
}

export const fetchManyUsers = async ({
  page,
  take,
}: FetchManyUsersProps): Promise<FetchManyUsersResProps> => {
  const count = await prisma.user.count();
  const pages = Math.round(count / take);

  const skip = page * take;

  const users = await prisma.user.findMany({
    skip,
    take,
  });

  return {
    users,
    pages,
  };
};
