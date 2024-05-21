"use server";
import { ReactNode } from "react";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/misc/ReusableSidebar";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { nextAuthOptions } from "@/lib/authProviders";
import { redirect } from "next/navigation";
import { advertiserSidebarOptions } from "@/constants/advertiserSidebar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/advertiser/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user) return redirect("/advertiser/login");

  if (user.role !== "advertiser") return redirect("/advertiser/signout");

  return (
    <div className="flex h-svh w-full">
      <Sidebar options={advertiserSidebarOptions} />
      <div className="w-full">
        <Navbar
          signOutcallbackUrl={
            process.env.NEXT_PUBLIC_HOST! + "/advertiser/login"
          }
        />
        <div className="flex flex-col px-10 items-center justify-center h-[calc(100svh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
