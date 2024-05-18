import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";
import Navbar from "@/components/advertiser/Navbar";
import Sidebar from "@/components/advertiser/Sidebar";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { nextAuthOptions } from "@/lib/authProviders";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!session) {
    return (
      <div className="flex items-center justify-center h-svh w-svw">
        <Card className="border-none">
          <CardHeader>
            <p className="font-semibold text-lg text-center">
              {status == "unauthenticated"
                ? "Você não está logado 😕"
                : "Carregando sessão"}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              {status == "unauthenticated"
                ? "Por favor, faça login."
                : "Por favor, aguarde."}
            </p>
            <GoogleLoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-svh w-full">
      <Sidebar userRole={user?.role!} />
      <div className="w-full">
        <Navbar />
        <div className="flex flex-col container px-10 items-center justify-center h-[calc(100svh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
