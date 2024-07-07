import { getUserServerSession } from "@/actions/session/getUserServerSession";
import { nextAuthOptions } from "@/lib/authProviders";
import { UserAdAccountProps } from "@/types/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/advertiser/login");
  }

  const user = await getUserServerSession<UserAdAccountProps>({
    query: {
      include: {
        AdvertiserAccount: true,
      },
    },
  });

  if (user?.AdvertiserAccount) {
    return redirect("/advertiser/dashboard");
  }

  return <>{children}</>;
};

export default Layout;
