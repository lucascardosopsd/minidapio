import { fetchPlansByQuery } from "@/actions/plan/fetchPlansByQuery";
import CheckoutCreditCard from "@/components/payment/CheckoutCreditCard";
import CheckoutProfile from "@/components/payment/CheckoutProfile";
import { Separator } from "@/components/ui/separator";
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
                personType: checkDoc(customer?.cpfCnpj),
                postalCode: customer?.postalCode,
                state: customer?.state,
              }
            : null
        }
      />

      {customer && <Separator />}

      {customer && (
        <CheckoutCreditCard plan={plans[0]} customer={customer} user={user!} />
      )}
    </div>
  );
};

export default PaymentPage;
