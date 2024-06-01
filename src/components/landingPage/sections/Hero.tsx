"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-primary h-svh tablet:h-[calc(100svh-80px)] pt-10 tablet:py-0 w-full text-zinc-100 container">
      <div className="flex flex-col tablet:flex-row gap-5 items-center justify-center h-full mx-auto ">
        <div className="flex flex-col gap-5 flex-1 items-center tablet:items-start">
          <p className="text-4xl tablet:text-6xl font-bold w-full max-w-lg text-center tablet:text-start">
            MODERNIZE SEU RESTAURANTE
          </p>

          <p className="text-center tablet:text-start">
            Cardápio digital gratuito para oferecer uma melhor experiência para
            seu cliente
          </p>

          <Link href="/dashboard/login">
            <Button
              variant="outline"
              className="text-foreground font-semibold rounded-full"
            >
              Começar
            </Button>
          </Link>
        </div>

        <div className="flex items-end justify-center flex-[2] tablet:flex-[1.4] self-end">
          <Image
            src="/vectors/waiters.svg"
            alt="Garçons"
            height={1000}
            width={1000}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
