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
    <section className="container w-full h-full tablet:h-[70svh] flex items-center justify-center py-5">
      <Card className="max-w-4xl">
        <CardHeader className="flex-col justify-center items-center tablet:flex-row">
          <div className="flex flex-col flex-1">
            <p className="font-bold text-center tablet:text-end text-2xl">
              Planos para <span className="text-primary">anunciantes</span>
            </p>
            <p className="text-center tablet:text-end">
              Um só plano que atende as necessidades de marketing do seu
              negócio. Seja reconhecido em sua região, mostre sua emopresa.
            </p>
          </div>

          <div className="flex flex-col tablet:flex-row justify-center gap-5 flex-[2]">
            <Separator orientation="vertical" />

            <Card className="w-full">
              <CardHeader>
                <p className="text-center">Plano Único</p>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold text-center">R$150,00</p>
              </CardContent>

              <CardFooter>
                <Link
                  href="https://api.whatsapp.com/send?phone=5517996484654"
                  className="w-full flex justify-center"
                >
                  <Button className="w-full max-w-[200px]">Comece</Button>
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
