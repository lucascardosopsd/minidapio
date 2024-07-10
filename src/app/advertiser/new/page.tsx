import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdvertiserProfileForm from "@/components/advertiser/forms/Profile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nextAuthOptions } from "@/lib/authProviders";
import { UserAdAccountProps } from "@/types/user";
import { LogOutIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface NewAdvertiserAccountProps {
  searchParams?: {
    code?: String;
  };
}

const NewAdvertiserAccount = async ({
  searchParams,
}: NewAdvertiserAccountProps) => {
  const session = await getServerSession(nextAuthOptions);

  const user = await getUserServerSession<UserAdAccountProps>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });

  return (
    <section className="flex items-center justify-center gap-5 h-svh flex-col">
      <div className="flex items-center w-full px-10 py-5">
        <div className="flex-1"></div>

        <div className="flex-1">
          <p className="text-2xl text-center">Preencha seus dados</p>
          <p className="text-center">E comece a anunciar</p>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {session?.user?.image && (
                <Avatar>
                  <AvatarImage src={session?.user?.image!} />
                </Avatar>
              )}

              {!session?.user?.image && (
                <div className="flex-1 w-full">
                  <span className="rounded-full h-12 w-12 border border-border transition hover:border-primary flex items-center justify-center">
                    <p className="text-lg">
                      {session?.user?.name?.slice(0, 1)}
                    </p>
                  </span>
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 space-y-2">
              <p>{session?.user?.name}</p>

              <Link
                href="/advertiser/signout"
                className="flex items-center gap-2 justify-center border rounded p-2 hover:bg-white/5 transition w-full"
              >
                <LogOutIcon size={18} />

                <p>Sair</p>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AdvertiserProfileForm
        defaultValues={user?.AdvertiserAccount || undefined}
        user={user!}
        code={Number(searchParams?.code || null)}
      />
    </section>
  );
};

export default NewAdvertiserAccount;
