import { getAdvertiserAccount } from "@/actions/advertiser/getAdvertiserAccount";
import { checkMonthlyPayment } from "@/actions/payments/checkMonthlyPayment";
import { fetchUserPayments } from "@/actions/payments/fetchUserPayments";
import { getUserServerSession } from "@/actions/session/getUserServerSession";
import NewBillCard from "@/components/advertiser/cards/NewBill";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "@prisma/client";

const BillsPage = async () => {
  const user = await getUserServerSession({});

  const advertiserAccount = await getAdvertiserAccount({ userId: user?.id! });

  const payments = await fetchUserPayments({ userId: user?.id! });

  let hasPaid = await checkMonthlyPayment({ userId: user?.id! });

  return (
    <section className="h-svh w-full flex flex-col items-center space-y-5 overflow-y-auto pb-5">
      <div className="w-full flex justify-between border-b px-10 items-center py-5">
        <p className="text-4xl">Faturas</p>
      </div>

      {!hasPaid && (
        <>
          <NewBillCard
            advertiserAccount={advertiserAccount!}
            title="Clique no botão para gerar seu pagamento"
          />
          <Separator />
        </>
      )}

      <div className="flex flex-col justify-center gap-5 w-full px-10">
        <p>Pagamentos</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>ID Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment: Payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.dateCreated}</TableCell>
                <TableCell>{payment.value}</TableCell>
                <TableCell>{payment.billingType}</TableCell>
                <TableCell>{payment.paymentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default BillsPage;
