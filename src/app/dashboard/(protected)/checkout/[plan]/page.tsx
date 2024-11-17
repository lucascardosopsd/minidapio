import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import CheckoutCreditCard from "@/components/checkout/CheckoutCreditCard";
import CheckoutPixCard from "@/components/checkout/CheckoutPixCard";
import CheckoutProfile from "@/components/checkout/CheckoutProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { checkDoc } from "@/tools/checkDoc";
import { AsaasCustomerObj, AsaasCustomerResProps } from "@/types/asaasCustomer";
import axios from "axios";
import Image from "next/image";

interface PaymentPageProps {
  params: {
    plan: string;
  };
}

const PaymentPage = async ({ params }: PaymentPageProps) => {
  const user = await useCurrentUser();

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
    <div className="flex flex-col tablet:items-center tablet:justify-center gap-5 h-full">
      <Tabs
        defaultValue={user?.customerId ? "checkout" : "person"}
        className="max-w-[1000px] mx-auto [&_button[data-state=active]]:bg-primary [&_button[data-state=active]]:text-white"
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
          <div className="flex flex-col tablet:flex-row tablet:items-center gap-5 tablet:w-full">
            <CheckoutPixCard user={user!} plan={plans[0]} />
            <p className="text-center">OU</p>
            <CheckoutCreditCard
              plan={plans[0]}
              customer={customer}
              user={user!}
            />
          </div>
        </TabsContent>
      </Tabs>
      {/* Footer */}

      <div className="flex items-center gap-5 border-t w-full py-5 justify-center">
        <p className="max-w-96 text-center">
          Esta compra é intermediada e assegurada pelo gateway de pagamentos
          ASAAS
        </p>

        <Image
          alt="logo asaas"
          src="/logo-asaas.png"
          sizes="1000px"
          height={0}
          width={0}
          className="h-20 w-20 rounded-lg"
        />
      </div>
    </div>
  );
};

export default PaymentPage;
