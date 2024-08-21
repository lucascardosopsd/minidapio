"use server";
import prisma from "@/lib/prisma";

interface deletePaymentProps {
  id: string;
}

export const deletePayment = async ({ id }: deletePaymentProps) => {
  return await prisma.payment.delete({ where: { id } });
};
