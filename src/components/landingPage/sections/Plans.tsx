"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const PlansSection = () => {
  return (
    <section className="container w-full h-full tablet:h-svh flex items-center justify-center py-5">
      <Card>
        <CardHeader className="flex-col tablet:flex-row">
          <div className="flex flex-col gap-5 flex-1">
            <p className="font-bold text-center tablet:text-start text-2xl">
              Planos para <span className="text-primary">anunciantes</span>
            </p>
            <p className="text-center tablet:text-start">
              Selecione um plano que caiba no seu orçamento e apareça na sua
              região de maneira focada entre os itens do cardápio, sem competir
              visualmente com ninguém no mesmo instante.
            </p>
          </div>

          <div className="flex flex-col tablet:flex-row justify-stretch gap-5 flex-[3]">
            <Separator orientation="vertical" />

            <Card>
              <CardHeader>
                <p className="text-center">Plano Básico</p>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold text-center">R$100,00</p>
                <p className="text-center text-xs">Apareça 10% das vezes</p>
              </CardContent>

              <CardFooter>
                <Link
                  href="https://api.whatsapp.com/send?phone=5517996484654"
                  className="w-full"
                >
                  <Button className="w-full">Comece</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <p className="text-center">Plano Profissional</p>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold text-center">R$150,00</p>
                <p className="text-center text-xs">Apareça 20% das vezes</p>
              </CardContent>

              <CardFooter>
                <Link
                  href="https://api.whatsapp.com/send?phone=5517996484654"
                  className="w-full"
                >
                  <Button className="w-full">Comece</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <p className="text-center">Plano Ultra</p>
              </CardHeader>
              <CardContent>
                <p className="text-center line-through">R$200,00</p>

                <p className="text-4xl font-semibold text-center">R$175,00</p>
                <p className="text-center text-xs">Apareça 40% das vezes</p>
              </CardContent>

              <CardFooter>
                <Link
                  href="https://api.whatsapp.com/send?phone=5517996484654"
                  className="w-full"
                >
                  <Button className="w-full">Comece</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

export default PlansSection;
