import { getPaymentProfile } from "@/actions/paymentProfile/getPaymentProfile";
import { fetchUser } from "@/actions/user/fetchUser";
import PaymentProfileForm from "@/components/payment/Profile";
import { useUserSession } from "@/hooks/useUserSession";

const NewPaymentProfilePage = async () => {
  const session = await useUserSession();

  if (!session) {
    return;
  }

  const user = await fetchUser({ email: session?.email! });

  const paymentProfile = await getPaymentProfile({ userId: user?.id! });

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <p className="text-3xl">Perfil de pagamentos</p>
      <PaymentProfileForm user={user!} defaultValues={paymentProfile} />
    </div>
  );
};

export default NewPaymentProfilePage;
