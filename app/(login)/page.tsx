"use client";
import LoginIllustration from "@/components/illustration/Login";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 items-center justify-center relative hidden tablet:flex">
        <LoginIllustration />
      </div>

      <Separator orientation="vertical" />

      <div className="flex-1 flex justify-center items-center flex-col gap-2 px-4">
        <p className="mb-4">Minidapio</p>
        <p className="text-2xl font-bold">Vamos Começar!</p>
        <p>Entre com a sua conta</p>
        <Button className="w-full" onClick={() => signIn("google")}>
          <FaGoogle className="mr-2" />
          Continuar com Google
        </Button>
      </div>
    </main>
  );
}
