import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary p-10 flex text-zinc-100">
      <div className="container flex flex-col tablet:flex-row items-center justify-between mx-auto w-full gap-5 ">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            height={500}
            width={500}
            className="h-14 w-auto"
          />
          <p className="text-2xl font-bold text-zinc-100">Reserva</p>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">Legal</p>
            <p>Termos de uso</p>
            <p>Política de Privacidade</p>
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
