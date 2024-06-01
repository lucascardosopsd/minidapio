"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";
import { ThemeProvider } from "@/components/misc/ThemeProvider";

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
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem
      defaultTheme="dark"
    >
      {children}
    </ThemeProvider>
  );
};

export default Layout;
