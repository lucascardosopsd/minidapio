import Image from "next/image";

const HowWorksSection = () => {
  return (
    <section className="container h-full tablet:h-svh flex flex-col tablet:flex-row items-center justify-center gap-5">
      <div className="flex flex-col flex-1 py-10">
        <p className="text-2xl font-semibold text-primary">Como funciona?</p>

        <div className="flex flex-col">
          <p className="text-primary font-medium">Para restaurantes</p>
          <p>
            O estabelecimento registra seu cardápio, seus itens, recebe um
            cardápio com link único para compartilhar com seus clientes e
            permite que sejam exibidas propagandas específicas nele.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-primary text-end font-medium">Para anunciantes</p>
          <p className="text-end">
            O anunciante então cria os anúncios que serão exibidos nos cardápios
            dos restaurantes de sua região sempre que estes forem acessados.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1">
        <Image
          alt="smartphone"
          src="/vectors/smartphone.svg"
          height={500}
          width={500}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default HowWorksSection;
