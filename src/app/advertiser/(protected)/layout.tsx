"use server";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/authProviders";
import { redirect } from "next/navigation";
import Sidebar from "@/components/misc/ReusableSidebar";
import { advertiserSidebarOptions } from "@/constants/advertiserSidebar";
import Navbar from "@/components/advertiser/Navbar";
import { getUserServerSession } from "@/actions/session/getUserServerSession";
import { UserAdAccountProps } from "@/types/user";

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

  if (!user) return redirect("/advertiser/login");

  if (!user.AdvertiserAccount) return redirect("/advertiser/new");

  return (
    <div className="flex h-svh w-full">
      <Sidebar
        options={advertiserSidebarOptions}
        redirectLogout="/advertiser/login"
      />
      <div className="w-full">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100svh-70px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
