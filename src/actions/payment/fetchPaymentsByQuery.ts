"use server";
import prisma from "@/lib/prisma";
import { Payment, Prisma } from "@prisma/client";

interface FetchPaymentsByQueryResProps {
  payments: Payment[];
  pages: number;
}

interface FetchPaymentsByQueryProps {
  take: number;
  page: number;
  query?: Prisma.PaymentFindFirstArgs;
}

export const fetchPaymentsByQuery = async <T = FetchPaymentsByQueryResProps>({
  page,
  take,
  query = {},
}: FetchPaymentsByQueryProps): Promise<T> => {
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
