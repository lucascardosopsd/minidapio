"use client";

import { WobbleCard } from "@/components/ui/wobble-card";
import { motion } from "framer-motion";
import { ChartNoAxesCombined, Component, Sparkle, User } from "lucide-react";

const Advantages = () => {
  const items = [
    {
      title: "Mão de Obra",
      description:
        "Um cardápio digital exclui a necessidade do cardápio físico, possibilitando com que o cliente navegue pelo seu catálogo sem a necessidade de um atendente ao sentar à mesa. Além disso um leque de novas possibilidades se abre utilizando esta solução",
      icon: User,
      cols: 2,
    },
    {
      title: "Experiência do usuário",
      description:
        "O tempo de atendimento é drásticamente reduzido uma vez que não há necessidade de aguardar pelo cardápio",
      icon: Sparkle,
      cols: 1,
    },
    {
      title: "Design de Interface",
      description:
        "O produto é pensado para ser simples, fácil, bonito e direto ao ponto",
      icon: Component,
      cols: 1,
    },
    {
      title: "Planos Escaláveis",
      description:
        "Comece gratuitamente sem cartão de crédito e depois escolha o plano que melhor se adequa ás suas necessidades, com propostas para pequenas, médias e grandes empresas e o gerenciamento de múltiplos estabelecimentos através de uma única conta",
      icon: ChartNoAxesCombined,
      cols: 2,
    },
  ];

  return (
    <section className="container min-h-full tablet:min-h-svh flex flex-col items-center justify-center gap-5">
      <h1 className="text-6xl font-semibold text-primary text-center">
        Vantagens do Cardápio Digital
      </h1>

      <p className="pl-2 text-2xl text-center">
        Ter um cardápio digital muda completamente o seu formato de atendimento,
        seja via whatsapp ou na mesa
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto w-full">
        {items.map((item, index) => (
          <motion.div
            className={`col-span-1 tablet:col-span-${item.cols}`}
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: { scale: 1 },
              hidden: { scale: 0 },
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index / 2,
            }}
          >
            <WobbleCard
              key={index}
              containerClassName={`h-full bg-white dark:bg-background border border-border  min-h-[500px] lg:min-h-[300px] bg-gradient-to-tl dark:from-zinc-900/25 to-transparent`}
            >
              <item.icon className="text-primary" />

              <h1 className="text-4xl text-primary font-semibold">
                {item.title}
              </h1>

              <p className="text-2xl">{item.description}</p>
            </WobbleCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
