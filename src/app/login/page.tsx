"use client";
import LoginIllustration from "@/components/restaurant/illustration/Login";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";
import Logo from "@/components/misc/Logo";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/restaurants");
    return <></>;
  }

  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 items-center justify-center relative hidden tablet:flex">
        <LoginIllustration />
      </div>

      <Separator orientation="vertical" />

      <div className="flex-1 flex justify-center items-center flex-col gap-2 px-4 max-w-md">
        <Logo />

        <p className="text-2xl font-bold">Reserva</p>
        <p>Entre com a sua conta</p>

        <GoogleLoginButton />
      </div>
    </main>
  );
}
