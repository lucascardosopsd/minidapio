"use server";

import { ReactNode } from "react";
import Navbar from "@/components/advertiser/Navbar";
import Sidebar from "@/components/advertiser/Sidebar";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { nextAuthOptions } from "@/lib/authProviders";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return redirect("/admin/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user) return redirect("/admin/login");

  if (user.role !== "admin") return redirect("/admin/signout");

  return (
    <div className="flex h-svh w-full">
      <Sidebar />
      <div className="w-full">
        <Navbar
          signOutcallbackUrl={process.env.NEXT_PUBLIC_HOST! + "/admin/login"}
        />
        <div className="flex flex-col px-10 items-center justify-center h-[calc(100svh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
