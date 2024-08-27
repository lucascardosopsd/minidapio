"use client";

import BlurIn from "@/components/magicui/blur-in";
import DotPattern from "@/components/magicui/dot-pattern";
import WordRotate from "@/components/magicui/word-rotate";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="h-svh flex flex-col items-center justify-center tablet:h-[calc(100svh-80px)] pt-10 tablet:py-0 w-full container">
      <DotPattern
        width={20}
        height={20}
        className={cn(
          "opacity-25 -z-50",
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
        )}
      />

      <BlurIn
        word="Eleve o nível do seu restaurante"
        className="text-8xl tablet:text-4xl font-bold text-primary"
      />

      <WordRotate
        className="text-2xl font-bold"
        words={[
          "Um cardápio digital",
          "Simples de usar",
          "Com Interface minimalista",
          "Focado na usabilidade",
          "Fácil de gerenciar",
          "E confiável",
        ]}
      />
    </section>
  );
};

export default HeroSection;
