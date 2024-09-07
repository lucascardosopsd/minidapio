import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-10 flex border-t border-border">
      <div className="container flex flex-col tablet:flex-row items-center justify-between mx-auto w-full gap-5 ">
        <div className="flex flex-col tablet:flex-row items-center gap-2">
          <p className="text-2xl font-bold">Minidapio</p>

          <span className="h-[1px] tablet:h-20 w-full tablet:w-[1px] bg-muted" />

          <p>
            Feito por{" "}
            <Link
              href="https://www.linkedin.com/in/lcpsd/"
              className="text-red-500"
            >
              Lucas Cardoso
            </Link>
          </p>
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center tablet:text-start">
              Legal
            </p>

            <Link href="/termos_de_uso.pdf">
              <p className="text-center tablet:text-start">Termos de Uso</p>
            </Link>

            <Link href="/politica_de_privacidade.pdf">
              <p className="text-center tablet:text-start">
                Política de Privacidade
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
