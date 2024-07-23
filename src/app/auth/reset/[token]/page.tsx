"use client";
import { resetPass } from "@/actions/auth/resetPass";
import FieldBuilder from "@/components/builders/FieldBuilder";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ResetPassProps {
  params?: {
    token: string;
  };
}

const ResetPass = ({ params }: ResetPassProps) => {
  const validator = z
    .object({
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(validator),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (data: z.infer<typeof validator>) => {
    setLoading(true);
    try {
      await resetPass({ token: params?.token!, password: data.password });

      toast.success("Senha alterada. Faça login.");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro.");
    } finally {
      setLoading(false);
      form.reset();
      setFinished(true);
    }
  };

  return (
    <>
      <div className="hidden tablet:flex border-b w-full px-[16px] tablet:px-[80px] desktop:px-[162px] h-20">
        <div className="flex items-center justify-between mx-auto w-full p-2">
          <Link href="/">
            <Image
              src="/logo-banner.svg"
              alt="logo"
              height={500}
              width={500}
              className="h-14 w-auto"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-[80svh] w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5 w-full max-w-[400px]"
          >
            <FieldBuilder
              title="Digite a nova senha"
              name="password"
              control={form.control}
              fieldElement={<Input type="password" />}
            />

            <FieldBuilder
              title="Confirme"
              name="confirmPassword"
              control={form.control}
              fieldElement={<Input type="password" />}
            />

            <Button type="submit" disabled={loading}>
              Salvar
            </Button>

            {finished && (
              <Link href="/">
                <p className="text-center text-sm">Ir para o inicio</p>
              </Link>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};

export default ResetPass;
