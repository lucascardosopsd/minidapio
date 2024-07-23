"use client";
import LoginIllustration from "@/components/restaurant/illustration/Login";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";
import Logo from "@/components/misc/Logo";
import { useForm } from "react-hook-form";
import FieldBuilder from "@/components/builders/FieldBuilder";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "@/validators/login";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { revalidateRoute } from "@/actions/revalidateRoute";

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidator),
  });

  const pathname = usePathname();

  const handleSubmit = async (data: z.infer<typeof loginValidator>) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Login inválido!");

      return;
    }

    revalidateRoute({ fullPath: pathname });
  };

  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 items-center justify-center relative hidden tablet:flex">
        <LoginIllustration />
      </div>

      <Separator orientation="vertical" className="hidden tablet:block" />

      <div className="flex-1 flex justify-center items-center flex-col gap-2 px-4 max-w-md">
        <Logo />

        <p className="text-2xl font-bold">Reserva</p>
        <p>Entre com a sua conta</p>

        <div className="flex flex-col gap-5 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full space-y-5"
            >
              <FieldBuilder
                name="email"
                title="E-mail"
                control={form.control}
                fieldElement={
                  <Input type="email" placeholder="exemplo@mail.com" />
                }
              />

              <FieldBuilder
                name="password"
                title="Senha"
                control={form.control}
                fieldElement={
                  <Input type="password" placeholder="***********" />
                }
              />

              <Link href="/auth/reset/" className="text-xs text-primary">
                Esqueci minha senha
              </Link>

              <Button className="w-full">Entrar</Button>
            </form>
          </Form>
        </div>

        <GoogleLoginButton variant="outline" />

        <Link href="/auth/register">
          <p className="text-end text-sm text-primary">Criar uma conta</p>
        </Link>
      </div>
    </main>
  );
}
