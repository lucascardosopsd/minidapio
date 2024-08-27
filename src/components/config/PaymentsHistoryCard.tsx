import { formatPrice } from "@/tools/formatPrice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { statusI18n } from "@/constants/paymentStatusI18n";
import moment from "moment";
import { PaymentWithSubscriptionWithPlan } from "@/types/subscription";

interface PaymentsHistoryCardProps {
  payments: PaymentWithSubscriptionWithPlan[];
}

const PaymentsHistoryCard = ({ payments }: PaymentsHistoryCardProps) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Histórico de pagamento</CardTitle>
        <CardDescription>
          Últimos 12 pagamentos realizados em sua assinatura
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>validade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.asaasId}</TableCell>
                <TableCell>
                  {formatPrice(payment.value, "pt-BR", "BRL")}
                </TableCell>
                <TableCell>{payment.Subscription?.Plan?.title}</TableCell>
                <TableCell>{statusI18n[payment.status]}</TableCell>
                <TableCell>{payment.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  {moment(payment.createdAt)
                    .add(1, "month")
                    .format("DD/MM/YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentsHistoryCard;