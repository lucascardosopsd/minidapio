"use client";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";

export default function Login() {
  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 flex justify-center items-center flex-col gap-2 px-4 max-w-md">
        <p className="mb-4">Reserva</p>
        <p className="text-2xl font-bold">Vamos Começar!</p>
        <p>Entre com a sua conta</p>

        <GoogleLoginButton />
      </div>
    </main>
  );
}
