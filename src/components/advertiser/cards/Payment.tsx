import { formatPrice } from "@/tools/formatPrice";
import { Payment } from "@prisma/client";
import moment from "moment";

interface PaymentCardprops {
  payment: Payment;
}

const PaymentCard = ({ payment }: PaymentCardprops) => {
  return (
    <div className="flex gap-5 w-full items-center border rounded p-5 justify-center">
      <p>{moment(payment.dateCreated).format("DD/MM/YYYY")}</p>

      <span className="h-full w-[1px] bg-muted" />

      <p>{formatPrice(payment.value, "pt-BR", "BRL")}</p>

      <span className="h-full w-[1px] bg-muted" />

      <p>{payment.billingType}</p>

      <span className="h-full w-[1px] bg-muted" />

      <p>{payment.paymentId}</p>
    </div>
  );
};

export default PaymentCard;
