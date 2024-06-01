import Image from "next/image";

const AdvantagesSection = () => {
  return (
    <section className="container h-full tablet:h-svh flex flex-col tablet:flex-row items-center justify-center gap-5">
      <div className="flex items-center justify-center flex-1 order-2 tablet:order-1">
        <Image
          alt="vantagens"
          src="/vectors/advantages.svg"
          className="w-full h-auto"
          height={500}
          width={500}
        />
      </div>

      <div className="flex flex-col flex-1 py-10 order-1 tablet:order-2">
        <p className="text-2xl font-semibold text-primary">Como funciona?</p>

        <div className="flex flex-col">
          <p className="text-primary font-medium">Para restaurantes</p>
          <p>
            O cardápio é gratuito e possuí uma interface agradável, pensada para
            a melhor experiência do usuário se diferenciando da maioria dos
            cardápios atuais.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-end font-medium">Para anunciantes</p>
          <p className="text-end">
            Por um valor relativamente baixo, seu negócio é impulsionado e
            conhecido na região em um local com menor competição entre anúncios,
            além de poder rastrear visualizações e disponibilizar um link para o
            cliente que o direciona para onde quiser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
