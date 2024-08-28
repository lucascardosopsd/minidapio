import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-10 flex border-t border-border">
      <div className="container flex flex-col tablet:flex-row items-center justify-between mx-auto w-full gap-5 ">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">Minidapio</p>

          <p>|</p>

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
            <p className="text-2xl font-semibold">Legal</p>

            <Link href="/termos_de_uso.pdf">
              <p>Termos de Uso</p>
            </Link>

            <Link href="/politica_de_privacidade.pdf">
              <p>Política de Privacidade</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
