import { TableCell, TableRow } from "@/components/ui/table";
import { statusI18n } from "@/constants/paymentStatusI18n";
import { formatPrice } from "@/tools/formatPrice";
import { PaymentWithSubscriptionWithPlan } from "@/types/subscription";
import moment from "moment";

interface PaymentRowProps {
  payment: PaymentWithSubscriptionWithPlan;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  console.log(payment);

  return (
    <TableRow>
      <TableCell>{payment.stripeId}</TableCell>
      <TableCell>{formatPrice(payment.amount, "pt-BR", "BRL")}</TableCell>
      <TableCell>{payment.Subscription?.Plan?.title}</TableCell>
      <TableCell>{statusI18n[payment.status]}</TableCell>
      <TableCell>{payment.createdAt.toLocaleDateString()}</TableCell>
      <TableCell>
        {moment(payment.createdAt).add(1, "month").format("DD/MM/YYYY")}
      </TableCell>
    </TableRow>
  );
};

export default PaymentRow;
