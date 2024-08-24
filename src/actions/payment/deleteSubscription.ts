"use server";
import prisma from "@/lib/prisma";

interface DeletePaymentProps {
  id: string;
}

export const deletePayment = async ({ id }: DeletePaymentProps) => {
  return await prisma.payment.delete({ where: { id } });
};
