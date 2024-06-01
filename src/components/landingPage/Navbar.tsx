"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex border-b w-full px-[16px] tablet:px-[80px] desktop:px-[162px]">
      <div className="flex items-center justify-between mx-auto w-full p-2">
        <Image
          src="/logo-banner.svg"
          alt="logo"
          height={500}
          width={500}
          className="h-full w-auto"
        />

        <div className="flex items-center gap-5">
          {/* <Button>Afiliado</Button> */}

          <Link href="/advertiser/login">
            <Button>Anunciante</Button>
          </Link>

          <Link href="/dashboard/login">
            <Button>Restaurante</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
