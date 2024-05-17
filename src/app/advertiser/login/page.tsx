"use client";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/advertiser/dashboard");
    return <></>;
  }

  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 items-center justify-center relative hidden tablet:flex flex-col">
        <p className="text-2xl font-semibold">Torne-se um anunciante hoje.</p>

        <p>Seja conhecido em sua região por um preço justo.</p>
      </div>

      <Separator orientation="vertical" />

      <div className="flex-1 flex justify-center items-center flex-col gap-2 px-4">
        <p className="mb-4">Minidapio</p>
        <p className="text-2xl font-bold">Vamos Começar!</p>
        <p>Entre com a sua conta</p>

        <GoogleLoginButton />
      </div>
    </main>
  );
}
