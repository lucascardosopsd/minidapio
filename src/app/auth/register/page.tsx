"use client";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Register() {
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerValidator),
  });

  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof registerValidator>) => {
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 flex justify-center items-center flex-col gap-2 px-4 max-w-md">
        <p className="text-2xl font-bold">Minidapio</p>
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

              <div className="flex gap-2 items-center">
                <Checkbox onCheckedChange={() => setAgree(!agree)} />

                <Link href="/politica_de_privacidade.pdf">
                  <p className="underline">
                    Li e aceito os termos de privacidade
                  </p>
                </Link>
              </div>

              <Button className="w-full" disabled={!agree || loading}>
                Registrar
              </Button>
            </form>
          </Form>
        </div>

        <Link href="/auth/login">
          <p className="text-end text-sm text-primary">Entrar na conta</p>
        </Link>
      </div>
    </main>
  );
}
