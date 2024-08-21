"use server";
import prisma from "@/lib/prisma";
import { Payment, Prisma } from "@prisma/client";

interface FetchManyPaymentsResProps {
  payments: Payment[];
  pages: number;
}

interface FetchManyPaymentsProps {
  take: number;
  page: number;
  query?: Prisma.PaymentFindManyArgs;
}

export const fetchManyPayments = async <T = FetchManyPaymentsResProps>({
  page,
  take,
  query = {},
}: FetchManyPaymentsProps): Promise<T> => {
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
