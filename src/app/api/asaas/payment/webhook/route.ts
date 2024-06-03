import prisma from "@/lib/prisma";
import { PaymentResProps } from "@/types/paymentProps";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  try {
    const payment = (await req.json()).payment satisfies PaymentResProps;

    const advertiserAccount = await prisma.advertiserAccount.findFirst({
      where: {
        customerId: payment.customer,
      },
    });

    const checkPayment = await prisma.payment.findFirst({
      where: {
        paymentId: payment.id,
      },
    });

    if (checkPayment) {
      return Response.json({ ok: false });
    }

    await prisma.payment.create({
      data: {
        paymentId: payment.id,
        dateCreated: payment.dateCreated,
        customer: payment.customer,
        paymentLink: payment.paymentLink,
        dueDate: payment.dueDate,
        value: payment.value,
        billingType: payment.billingType,
        status: payment.status,
        description: payment.description,
        paymentDate: payment.paymentDate,
        deleted: payment.deleted,
        userId: advertiserAccount?.userId,
        advertiserAccountId: advertiserAccount?.id!,
      },
    });

    revalidatePath("/advertiser/bills");

    return Response.json({ ok: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({ ok: true });
  }
};
