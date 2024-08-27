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

interface UpdatePaymentProps {
  paymentId: string;
  data: Partial<NewPaymentProps>;
}

const updatePayment = async ({ paymentId, data }: UpdatePaymentProps) => {
  return await prisma.payment.update({
    where: { id: paymentId },
    data,
  });
};

export default updatePayment;
