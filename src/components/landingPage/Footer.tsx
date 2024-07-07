import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-10 flex border">
      <div className="container flex flex-col tablet:flex-row items-center justify-between mx-auto w-full gap-5 ">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            height={500}
            width={500}
            className="h-14 w-auto"
          />
          <p className="text-2xl font-bold">Reserva</p>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">Legal</p>
            <p>Termos de uso</p>
            <Link href="/politica_de_privacidade.pdf">
              <p>Política de Privacidade</p>
            </Link>
            <p>Cookies</p>
          </div>

          <div className="flex flex-col">
            <p className="text-2xl font-semibold">Suporte</p>
            <p>FAQ</p>
            <p>Contato</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
