import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdvertiserProfileForm from "@/components/advertiser/forms/Profile";
import { Button } from "@/components/ui/button";
import { nextAuthOptions } from "@/lib/authProviders";
import { UserAdPaymentProps } from "@/types/user";
import { LogOutIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const NewAdvertiserAccount = async () => {
  const session = await getServerSession(nextAuthOptions);

  const user = await getUserServerSession<UserAdPaymentProps>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });

  return (
    <section className="flex items-center justify-center gap-5 h-svh flex-col">
      <div className="flex items-center w-full px-10">
        <div className="flex-1"></div>

        <div className="flex-1">
          <p className="text-2xl text-center">Preencha seus dados</p>
          <p className="text-center">E comece a anunciar</p>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2">
          <Image
            src={session?.user?.image!}
            alt="Usuário"
            height={500}
            width={500}
            className="h-10 w-10 rounded-full"
          />

          <Link href="/advertiser/signout">
            <Button
              variant="outline"
              size="sm"
              className="group hover:bg-primary hover:border-primary transition"
            >
              <LogOutIcon
                size={18}
                className="text-primary group-hover:text-background "
              />
            </Button>
          </Link>
        </div>
      </div>

      <AdvertiserProfileForm
        defaultValues={user?.AdvertiserAccount || undefined}
        user={user!}
      />
    </section>
  );
};

export default NewAdvertiserAccount;
