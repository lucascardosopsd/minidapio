"use client";
import BlurIn from "@/components/magicui/blur-in";
import DotPattern from "@/components/magicui/dot-pattern";
import WordRotate from "@/components/magicui/word-rotate";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="h-svh flex flex-col justify-center tablet:h-[calc(100svh-80px)] pt-10 tablet:py-0 w-full container !max-w-[1200px]">
      <DotPattern
        width={20}
        height={20}
        className={cn(
          "opacity-25 -z-50",
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
        )}
      />

      <BlurIn
        word="O cardápio perfeito para pequenos e médios negócios"
        className="text-8xl !font-normal !text-start"
      />

      <WordRotate
        className="text-xl tablet:text-4xl font-semibold text-primary"
        words={["Simples", "Minimalista", "Fácil", "Essencial", "E confiável"]}
      />
    </section>
  );
};

export default HeroSection;
