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
import { PaymentWithSubscriptionProps } from "@/types/paymentProps";
import { plans } from "@/constants/plans";
import { statusI18n } from "@/constants/paymentStatusI18n";

interface PaymentsHistoryCardProps {
  payments: PaymentWithSubscriptionProps[];
}

const PaymentsHistoryCard = ({ payments }: PaymentsHistoryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de pagamento</CardTitle>
        <CardDescription>
          Últimos pagamentos realizados em sua assinatura
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
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.asaasId}</TableCell>
                <TableCell>
                  {formatPrice(payment.value, "pt-BR", "BRL")}
                </TableCell>
                <TableCell>
                  {
                    plans.filter((plan) => plan.alias == payment?.plan)[0]
                      ?.title
                  }
                </TableCell>
                <TableCell>{statusI18n[payment.status]}</TableCell>
                <TableCell>{payment.createdAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentsHistoryCard;
