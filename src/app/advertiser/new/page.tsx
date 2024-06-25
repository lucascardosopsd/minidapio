import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdvertiserProfileForm from "@/components/advertiser/forms/Profile";
import { nextAuthOptions } from "@/lib/authProviders";
import { UserAdPaymentProps } from "@/types/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const NewAdvertiserAccount = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/advertiser/login");
  }

  const user = await getUserServerSession<UserAdPaymentProps>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });

  if (user?.AdvertiserAccount) {
    return redirect("/advertiser/dashboard");
  }

  return (
    <section className="flex items-center justify-center gap-5 h-svh flex-col">
      <div>
        <p className="text-2xl text-center">Preencha seus dados</p>
        <p className="text-center">E comece a anunciar</p>
      </div>

      <AdvertiserProfileForm
        defaultValues={user?.AdvertiserAccount || undefined}
        user={user!}
      />
    </section>
  );
};

export default NewAdvertiserAccount;
