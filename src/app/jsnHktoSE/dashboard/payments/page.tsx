import Paginate from "@/components/misc/Paginate";
import ReusableComboSearch from "@/components/misc/ReusableComboSearch";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchPaymentsByQuery } from "@/actions/payment/fetchPaymentsByQuery";
import { fetchUsersByQuery } from "@/actions/user/fetchUsersByQuery";
import DateRange from "@/components/misc/DateRange";
import { PaymentWithSubscriptionWithPlan } from "@/types/subscription";
import PaymentRow from "@/components/admin/tableRows/PaymentRow";

interface PaymentReturnProps {
  payments: PaymentWithSubscriptionWithPlan[];
  pages: number;
}

interface AdminDashboardProps {
  searchParams: Promise<{
    startDate?: Date;
    endDate?: Date;
    userId?: string;
    page: string;
  }>;
}

const AdminDashboard = async ({ searchParams }: AdminDashboardProps) => {
  const { startDate, endDate, userId, page } = await searchParams;

  const { payments, pages } = await fetchPaymentsByQuery<PaymentReturnProps>({
    page: 0,
    take: 10000,
    query: {
      where: endDate &&
        startDate && {
          createdAt: {
            lte: new Date(endDate),
            gte: new Date(startDate),
          },
          userId,
        },
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
      },
    },
  });

  const { users } = await fetchUsersByQuery({ page: 0, take: 1000, query: {} });

  const usersOptions = users.map((user) => ({
    label: user.name || "",
    value: user.id || "",
  }));

  return (
    <section className="flex flex-col items-center justify-center overflow-y-auto h-screen w-full gap-5 my-5">
      <div className="flex items-center gap-10">
        <div className="flex flex-col">
          <p className="text-xs">Filtrar usuário</p>
          <ReusableComboSearch
            items={usersOptions}
            title="Filtrar usuário"
            queryTitle="userId"
          />
        </div>
        <DateRange
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          className="justify-center"
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-5 h-[calc(100svh-120px)] overflow-y-auto pb-20 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>

              <TableHead>Preço</TableHead>

              <TableHead>Plano</TableHead>

              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>

              <TableHead>Validade</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment) => (
              <PaymentRow payment={payment} key={payment.id} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={Number(page)} />
      </div>
    </section>
  );
};

export default AdminDashboard;
