import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdvertiserProfileForm from "@/components/advertiser/forms/Profile";
import { UserAdAccountProps } from "@/types/user";

const ConfigPage = async () => {
  const user = await getUserServerSession<UserAdAccountProps>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });

  return (
    <section className="h-[calc(100svh-70px)] flex flex-col items-center overflow-y-auto pb-5 w-full">
      <div className="w-full flex justify-between border-b px-10 items-center py-5">
        <p className="text-4xl">Configurações</p>
      </div>

      <p className="text-2xl mt-5">Perfil do anunciante</p>
      <AdvertiserProfileForm
        defaultValues={user?.AdvertiserAccount || undefined}
        user={user!}
        code={user?.AdvertiserAccount?.afiliateCode || null}
      />
    </section>
  );
};

export default ConfigPage;
