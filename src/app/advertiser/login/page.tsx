"use client";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";
import Logo from "@/components/misc/Logo";

export default function Login() {
  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 items-center justify-center relative hidden tablet:flex flex-col">
        <p className="text-4xl text-semibold text-primary">
          Painel do anúnciante
        </p>
        <p>Seja conhecido na sua região.</p>
      </div>

      <Separator orientation="vertical" className="hidden tablet:block" />

      <div className="flex-1 flex justify-center items-center flex-col gap-2 px-4 max-w-md">
        <Logo />

        <p className="text-2xl font-bold">Reserva</p>
        <p>Entre com a sua conta</p>

        <GoogleLoginButton />
      </div>
    </main>
  );
}
