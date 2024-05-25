"use server";
import { nextAuthOptions } from "@/lib/authProviders";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

interface ArgsProps {
  include?: Prisma.UserInclude;
  select?: Prisma.UserSelect;
}

interface GetUserServerSessionProps {
  query?: ArgsProps;
}

export const getUserServerSession = async <T = User>(
  props: GetUserServerSessionProps
): Promise<T | null> => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return null;
  }

  const query = {
    where: {
      email: session?.user?.email!,
    },
    ...props?.query,
  } satisfies Prisma.UserFindUniqueArgs;

  const user = await prisma.user.findUnique(query);

  return user as T | null;
};
