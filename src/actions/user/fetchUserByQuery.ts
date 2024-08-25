"use server";
import prisma from "@/lib/prisma";
import { Payment, Prisma } from "@prisma/client";

interface FetchUsersByQueryResProps {
  payments: Payment[];
  pages: number;
}

interface FetchUserByQueryProps {
  take: number;
  page: number;
  query?: Prisma.PaymentFindFirstArgs;
}

export const fetchUsersByQuery = async <T = FetchUsersByQueryResProps>({
  page,
  take,
  query = {},
}: FetchUserByQueryProps): Promise<T> => {
  const count = await prisma.user.count();
  const pages = Math.ceil(count / take);

  const skip = page * take;

  const payments = await prisma.payment.findMany({
    skip,
    take,
    ...query,
  });

  return {
    payments,
    pages,
  } as T;
};
