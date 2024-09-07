import { Chrome, Component, SearchIcon, Star, TextSearch } from "lucide-react";
import Notification, { NotificationProps } from "../Notification";
import { AnimatedList } from "@/components/magicui/animated-list";
import { Separator } from "@/components/ui/separator";

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
    <section className="container min-h-svh tablet:h-svh flex flex-col tablet:flex-row items-center justify-center gap-5">
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-4xl tablet:text-6xl font-semibold text-primary text-center tablet:text-end">
          Funcionalidades do Minidapio
        </h1>

        <p className="pl-2 text-xl text-center tablet:text-end">
          O Minidapio possui diversas funcionalidades que o destaca de seus
          concorrentes, possibilitando com que o usuário tenha a experiência
          digna dos restaurantes de mais alto padrão
        </p>
      </div>

      <Separator orientation="vertical" className="hidden tablet:block" />

      <div className="flex-[4] tablet:flex-1">
        <AnimatedList delay={200}>
          {items.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
    </section>
  );
};

export default Features;
