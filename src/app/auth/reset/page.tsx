"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";

const RequestReset = () => {
  const validator = z.object({
    email: z.string().email().min(4),
  });

  const form = useForm({
    resolver: zodResolver(validator),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: z.infer<typeof validator>) => {
    setLoading(true);

    try {
      await axios.post("/api/auth/reset", {
        email: data.email,
      });

      toast.success(
        "Verifique seu e-mail. Se houver algum cadastro relacionado, você receverá um link."
      );
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[85svh] w-full">
        <form
          className="flex flex-col gap-2 w-full max-w-[300px]"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <p className="text-start">Digite seu e-mail</p>
          <Input type="email" {...form.register("email")} />
          <Button type="submit" disabled={loading}>
            Requisitar
          </Button>
        </form>
      </div>
    </>
  );
};

export default RequestReset;
