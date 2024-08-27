import { Chrome, Component, SearchIcon, Star, TextSearch } from "lucide-react";
import Notification, { NotificationProps } from "../Notification";
import { AnimatedList } from "@/components/magicui/animated-list";

const Features = () => {
  const items: NotificationProps[] = [
    {
      title: "Interface",
      description:
        "Pensada para ser moderna e minimalista, sem o aspecto de sistemas arcaicos tradicionais",
      icon: <Component />,
    },
    {
      title: "Pesquisa",
      description:
        "O cliente pode pesquisar por produtos sem a necessidade de ficar procurando seu prato favorito por vários minutos",
      icon: <TextSearch />,
    },
    {
      title: "Favoritos",
      description:
        "Com essa funcionalidade é possível salvar produtos em uma lista para facilitar sua visualização posteriormente",
      icon: <Star />,
    },
    {
      title: "Ampliação",
      description:
        "O cardápio conta com a apliação das imagens, tornando a experiência visual do cliente muito mais agradável",
      icon: <SearchIcon />,
    },
    {
      title: "On-line",
      description:
        "Não há a necessidade de instalar nenhum aplicativo, basta abrir a câmera do celular, escanear o qr-code e utilizar o cardápio em apenas 2 passos",
      icon: <Chrome />,
    },
  ];

  return (
    <section className="container min-h-svh tablet:h-svh flex flex-col tablet:flex-row items-center justify-center">
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-4xl font-semibold text-primary">
          Vantagens do cardápio
        </h1>

        <p className="pl-2 text-2xl">
          O Minidapio possui diversas vantagens que o destaca de seus
          concorrentes, possibilitando com que o usuário tenha a experiência
          digna dos restaurantes de mais alto padrão
        </p>
      </div>

      <div className="flex-[4] tablet:flex-1">
        <AnimatedList delay={1000}>
          {items.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
    </section>
  );
};

export default Features;
