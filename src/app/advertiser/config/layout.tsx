"use server";
import { ReactNode } from "react";
import Sidebar from "@/components/misc/ReusableSidebar";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { nextAuthOptions } from "@/lib/authProviders";
import { redirect } from "next/navigation";
import { advertiserSidebarOptions } from "@/constants/advertiserSidebar";
import Navbar from "@/components/advertiser/Navbar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/advertiser/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user) return redirect("/advertiser/login");

  if (user.role !== ("advertiser" || "admin"))
    return redirect("/advertiser/signout");

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