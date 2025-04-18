"use server";
import prisma from "@/lib/prisma";

interface NewPaymentProps {
  dateCreated: string;
  customer: string;
  asaasId: string;
  dueDate?: string;
  value: number;
  billingType: string;
  status: string;
  description?: string;
  paymentDate: string;
  deleted: boolean;
  planId: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
}

interface CreatePaymentProps {
  payment: NewPaymentProps;
  userId: string;
}

const createPayment = async ({ payment }: CreatePaymentProps) => {
  return await prisma.payment.create({
    data: {
      ...payment,
      amount: payment.value,
      currency: "BRL",
    },
  });
};

export default createPayment;
