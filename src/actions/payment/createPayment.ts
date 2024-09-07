"use server";
import prisma from "@/lib/prisma";

interface NewPaymentProps {
  paymentId: string;
  dateCreated: string;
  customer: string;
  asaasId: string;
  dueDate: string;
  value: number;
  billingType: string;
  status: string;
  description?: string;
  paymentDate: string;
  deleted: boolean;
  plan: string;
  userId: string;
  subscriptionId: string;
}

interface CreatePaymentProps {
  payment: NewPaymentProps;
  userId: string;
}

const createPayment = async ({ payment }: CreatePaymentProps) => {
  return await prisma.payment.create({
    data: payment,
  });
};

export default createPayment;
