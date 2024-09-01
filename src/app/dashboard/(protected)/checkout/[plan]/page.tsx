import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import CheckoutCreditCard from "@/components/checkout/CheckoutCreditCard";
import CheckoutProfile from "@/components/checkout/CheckoutProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserSession } from "@/hooks/useUserSession";
import { checkDoc } from "@/tools/checkDoc";
import { AsaasCustomerObj, AsaasCustomerResProps } from "@/types/asaasCustomer";
import axios from "axios";

interface PaymentPageProps {
  params: {
    plan: string;
  };
}

const PaymentPage = async ({ params }: PaymentPageProps) => {
  const user = await useUserSession();

  let customer: AsaasCustomerObj | null = null;

  if (user?.customerId) {
    const { data } = await axios.get<AsaasCustomerResProps>(
      `${process.env.NEXT_PUBLIC_HOST}/api/asaas/customer/${user.customerId}`
    );
    customer = data.customer;

    if (!data) {
      return;
    }
  }

  const { plans } = await fetchPlansByQuery({
    page: 0,
    take: 1,
    query: {
      where: {
        alias: params.plan,
      },
    },
  });

  if (!plans.length) {
    throw new Error("Missing plan");
  }

  return (
    <div className="flex flex-col gap-5">
      <Tabs
        defaultValue={user?.customerId ? "checkout" : "person"}
        className="w-[800px] mx-auto [&_button[data-state=active]]:bg-primary [&_button[data-state=active]]:text-white"
      >
        <TabsList>
          <TabsTrigger value="person">Informações pessoais</TabsTrigger>
          <TabsTrigger value="checkout" disabled={!user?.customerId}>
            Pagamento
          </TabsTrigger>
        </TabsList>
        <TabsContent value="person">
          <CheckoutProfile
            user={user!}
            customerDefaultValues={
              customer
                ? {
                    name: customer?.name,
                    email: customer?.email,
                    address: customer?.address,
                    addressComplement: null,
                    addressNumber: customer?.addressNumber,
                    city: customer?.cityName,
                    cpfCnpj: customer?.cpfCnpj,
                    mobilePhone: customer?.mobilePhone,
                    postalCode: customer?.postalCode,
                    personType: checkDoc(customer?.cpfCnpj),
                    state: customer?.state,
                  }
                : null
            }
          />
        </TabsContent>
        <TabsContent value="checkout">
          <CheckoutCreditCard
            plan={plans[0]}
            customer={customer}
            user={user!}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentPage;
