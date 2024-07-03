"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const PlansSection = () => {
  const plans = [
    {
      id: 1,
      title: "Básico",
      description: "1 Anúncio",
      price: "R$100,00",
    },
    {
      id: 2,
      title: "Profissonal",
      description: "2 Anúncios",
      price: "R$150,00",
      sale: "R$200,00",
    },
    {
      id: 3,
      title: "Ultra",
      description: "3 Anúncios",
      price: "R$175,00",
      sale: "R$300,00",
    },
  ];

  return (
    <section className="container w-full h-full tablet:h-[70svh] flex items-center justify-center py-5">
      <Card className="max-w-4xl">
        <CardHeader className="flex-col justify-center items-center gap-5">
          <div className="flex flex-col flex-1">
            <p className="font-bold text-center text-2xl">
              Planos para <span className="text-primary">anunciantes</span>
            </p>
            <p className="text-center max-w-[80%] mx-auto">
              Um só plano que atende as necessidades de marketing do seu
              negócio. Seja reconhecido em sua região, mostre sua emopresa
            </p>
          </div>

          <div className="flex flex-col tablet:flex-row justify-center gap-5 flex-[2]">
            <Separator orientation="vertical" />

            {plans.map((plan) => (
              <Card className="w-full">
                <CardHeader>
                  <p className="text-center">{plan.title}</p>
                  <div className="flex flex-col">
                    <p className="text-xs line-through text-center">
                      {plan.sale}
                    </p>
                    <p className="text-4xl font-semibold text-center">
                      {plan.price}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-center text-primary">
                    {plan.description}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardHeader>
        <Link
          href="https://api.whatsapp.com/send?phone=556796641461"
          className="w-full flex justify-center"
        >
          <Button className="w-full max-w-[200px] tablet:ml-7 mb-5">
            Comece
          </Button>
        </Link>
      </Card>
    </section>
  );
};

export default PlansSection;
