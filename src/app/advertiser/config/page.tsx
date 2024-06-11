import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdvertiserProfileForm from "@/components/advertiser/forms/Profile";
import { UserAdPaymentProps } from "@/types/user";

const ConfigPage = async () => {
  const user = await getUserServerSession<UserAdPaymentProps>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });

  return (
    <section className="h-[calc(100svh-70px)] flex flex-col items-center overflow-y-auto pb-5">
      <div className="w-full flex justify-between border-b px-10 items-center py-5">
        <p className="text-4xl">Configurações</p>
      </div>

      <p className="text-2xl mt-5">Perfil do anunciante</p>
      <AdvertiserProfileForm
        defaultValues={user?.AdvertiserAccount || undefined}
        user={user!}
      />
    </section>
  );
};

export default ConfigPage;
