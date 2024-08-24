import { fetchSubscriptionsByQuery } from "@/actions/subscription/fetchManySubscriptions";
import { PaymentResProps } from "@/types/paymentProps";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const payment: PaymentResProps = (await req.json())
      .payment satisfies PaymentResProps;

    const { subscriptions } = await fetchSubscriptionsByQuery({
      page: 1,
      take: 100,
      query: {
        where: { asaasId: payment.subscription },
      },
    });

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
        userId: subscriptions[0].userId!,
        subscriptionId: subscriptions[0].id,
      },
    });

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
