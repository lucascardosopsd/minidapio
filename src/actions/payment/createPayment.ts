"use server";
import prisma from "@/lib/prisma";

interface NewPaymentProps {
  paymentId: string;
  dateCreated: string;
  customer: string;

  dueDate: string;
  value: number;
  billingType: string;
  status: string;
  description?: string;
  paymentDate: string;
  deleted: boolean;
  userId: string;
  subscriptionId: string;
}

interface CreatePaymentProps {
  subscription: NewPaymentProps;
  userId: string;
}

const createPayment = async ({ subscription }: CreatePaymentProps) => {
  return await prisma.payment.create({
    data: subscription,
  });
};

export default createPayment;
