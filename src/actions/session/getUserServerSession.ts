"use server";

import { nextAuthOptions } from "@/lib/authProviders";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { UserProps } from "@/types/user";
import { Prisma } from "@prisma/client";

interface ArgsProps {
  include?: Prisma.UserInclude;
  select?: Prisma.UserSelect;
}

interface GetUserServerSessionProps {
  query: ArgsProps;
}

export const getUserServerSession = async <T = UserProps>(
  props: GetUserServerSessionProps
): Promise<T | null> => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    ...(!!props.query && props.query),
  });

  return user as T | null;
};
