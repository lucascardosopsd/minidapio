import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdvertiserProfileForm from "@/components/advertiser/forms/Profile";
import { nextAuthOptions } from "@/lib/authProviders";
import { UserAdPaymentProps } from "@/types/user";
import { getServerSession } from "next-auth";
import Image from "next/image";
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
      <div className="flex items-center w-full px-10">
        <div className="flex-1"></div>

        <div className="flex-1">
          <p className="text-2xl text-center">Preencha seus dados</p>
          <p className="text-center">E comece a anunciar</p>
        </div>

        <div className="flex-1 flex justify-end">
          <Image
            src={session.user?.image!}
            alt="Usuário"
            height={500}
            width={500}
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>

      <AdvertiserProfileForm
        defaultValues={user?.AdvertiserAccount || undefined}
        user={user!}
        revalidatePath="/advertiser/new"
      />
    </section>
  );
};

export default NewAdvertiserAccount;
