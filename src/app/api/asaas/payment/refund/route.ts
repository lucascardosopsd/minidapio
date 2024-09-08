import { PaymentResProps } from "@/types/paymentProps";
import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { deletePayment } from "@/actions/payment/deleteSubscription";

export const POST = async (req: Request) => {
  try {
    const refund: RefundProps = (await req.json())
      .payment satisfies PaymentResProps;

    const { payments } = await fetchPaymentsByQuery({
      page: 0,
      take: 10,
      query: {
        where: {
          customer: refund.customer,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    });

    await deletePayment({
      id: payments[0].id,
    });

    return Response.json({ ok: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    // @ts-ignore
    return Response.json({});
  }
};
