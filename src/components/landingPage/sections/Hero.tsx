"use client";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="h-svh tablet:h-[calc(100svh-80px)] pt-10 tablet:py-0 w-full container">
      <div className="flex flex-col tablet:flex-row gap-5 items-center justify-center h-full mx-auto ">
        <div className="flex flex-col gap-5 flex-1 items-center justify-end tablet:justify-center tablet:items-start">
          <p className="text-4xl tablet:text-6xl font-bold w-full max-w-lg text-center tablet:text-start text-primary">
            MODERNIZE SEU RESTAURANTE
          </p>

          <p className="text-center tablet:text-start">
            Cardápio digital gratuito para oferecer uma melhor experiência ao
            seu cliente
          </p>
        </div>

        <div className="flex items-end justify-center flex-[2] tablet:flex-[1.4] self-end">
          <Image
            src="/vectors/waiters.svg"
            alt="Garçons"
            height={1000}
            width={1000}
            className="w-auto h-full object-cover tablet:w-auto tablet:h-full tablet:object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
