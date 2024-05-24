import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdvertiserProfileForm from "@/components/advertiser/forms/Profile";
import { UserPropsWithAdvertiser } from "@/types/user";

const ConfigPage = async () => {
  const user = await getUserServerSession<UserPropsWithAdvertiser>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });

  return (
    <section className="h-svh w-full flex flex-col items-center space-y-5 overflow-y-auto pb-5">
      <div className="w-full flex justify-between border-b px-10 items-center py-5">
        <p className="text-4xl">Configurações</p>
      </div>

      <p className="2xl">Perfil do anunciante</p>
      <AdvertiserProfileForm
        defaultValues={user?.AdvertiserAccount}
        user={user!}
      />
    </section>
  );
};

export default ConfigPage;
