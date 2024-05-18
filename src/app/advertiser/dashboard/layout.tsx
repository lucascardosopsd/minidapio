"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";
import Navbar from "@/components/advertiser/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();

  if (!data) {
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
    <>
      <Navbar />
      <div className="flex flex-col container px-10 items-center justify-center h-[calc(100svh-80px)]">
        {children}
      </div>
    </>
  );
};

export default Layout;
