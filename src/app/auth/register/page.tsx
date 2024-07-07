"use client";
import LoginIllustration from "@/components/restaurant/illustration/Login";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/misc/GoogleLoginButton";
import Logo from "@/components/misc/Logo";
import { useForm } from "react-hook-form";
import FieldBuilder from "@/components/builders/FieldBuilder";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registerValidator } from "@/validators/register";
import axios from "axios";
import { toast } from "sonner";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard/restaurants");
    return <></>;
  }

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerValidator),
  });

  const handleSubmit = async (data: z.infer<typeof registerValidator>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/register`,
        {
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
        {
          validateStatus: (status) =>
            (status >= 200 && status < 499) || status === 500,
        }
      );

      if (response.status == 409) {
        toast.info("Usuário já existe");
        return;
      }

      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    }
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
                name="name"
                title="Nome"
                control={form.control}
                fieldElement={<Input placeholder="Digite seu nome" />}
              />

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

              <FieldBuilder
                name="confirmPassword"
                title="Confirme a senha"
                control={form.control}
                fieldElement={
                  <Input type="password" placeholder="***********" />
                }
              />

              <Button className="w-full">Entrar</Button>
            </form>
          </Form>
        </div>

        <GoogleLoginButton variant="outline" />

        <Link href="/auth/signin">
          <p className="text-end text-sm text-primary">Criar uma conta</p>
        </Link>
      </div>
    </main>
  );
}
