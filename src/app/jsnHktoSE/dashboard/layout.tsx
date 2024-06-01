"use server";

import { ReactNode } from "react";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/misc/ReusableSidebar";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { nextAuthOptions } from "@/lib/authProviders";
import { redirect } from "next/navigation";
import { adminSidebarOptions } from "@/constants/adminSidebar";
import { ThemeProvider } from "@/components/misc/ThemeProvider";

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
      <Sidebar options={adminSidebarOptions} redirectLogout="/admin/login" />
      <div className="w-full">
        <Navbar />
        <div className="flex flex-col px-10 items-center justify-center h-[calc(100svh-80px)]">
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            enableSystem
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Layout;
