import { nextAuthOptions } from "@/lib/authProviders";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import prisma from "@/lib/prisma";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user || user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
};

export default Layout;
