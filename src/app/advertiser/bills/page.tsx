import { getAdvertiserAccount } from "@/actions/advertiser/getAdvertiserAccount";
import { fetchUserPayments } from "@/actions/payments/fetchUserPayments";
import { getUserServerSession } from "@/actions/session/getUserServerSession";
import NewBillCard from "@/components/advertiser/cards/NewBill";

const BillsPage = async () => {
  const user = await getUserServerSession({});

  const advertiserAccount = await getAdvertiserAccount({ userId: user?.id! });

  const payments = await fetchUserPayments({ userId: user?.id! });

  return (
    <section className="h-svh w-full flex flex-col items-center space-y-5 overflow-y-auto pb-5">
      <div className="w-full flex justify-between border-b px-10 items-center py-5">
        <p className="text-4xl">Faturas</p>
      </div>

      {!!payments && (
        <NewBillCard
          user={user!}
          advertiserAccount={advertiserAccount}
          title="Clique no botão para gerar seu primeiro pagamento"
        />
      )}
    </section>
  );
};

export default BillsPage;
