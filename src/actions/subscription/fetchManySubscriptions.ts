"use server";
import prisma from "@/lib/prisma";
import { Prisma, Subscription } from "@prisma/client";

interface FetchSubscriptionsByQueryResProps {
  subscriptions: Subscription[];
  pages: number;
}

interface FetchSubscriptionsByQueryProps {
  take: number;
  page: number;
  query?: Prisma.SubscriptionFindManyArgs;
}

export const fetchSubscriptionsByQuery = async <
  T = FetchSubscriptionsByQueryResProps
>({
  page,
  take,
  query = {},
}: FetchSubscriptionsByQueryProps): Promise<T> => {
  const count = await prisma.user.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const subscriptions = await prisma.subscription.findMany({
    skip,
    take,
    ...query,
  });

  return {
    subscriptions,
    pages,
  } as T;
};
