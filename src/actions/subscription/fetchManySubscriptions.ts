"use server";
import prisma from "@/lib/prisma";
import { Prisma, Subscription } from "@prisma/client";

interface FetchManyPaymentsResProps {
  subscriptions: Subscription[];
  pages: number;
}

interface FetchManyPaymentsProps {
  take: number;
  page: number;
  query?: Prisma.SubscriptionFindManyArgs;
}

export const fetchManyPayments = async <T = FetchManyPaymentsResProps>({
  page,
  take,
  query = {},
}: FetchManyPaymentsProps): Promise<T> => {
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
