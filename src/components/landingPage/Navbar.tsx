"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="hidden tablet:flex border-b w-full px-[16px] tablet:px-[80px] desktop:px-[162px] h-20">
        <div className="flex items-center justify-between mx-auto w-full p-2">
          <Image
            src="/logo-banner.svg"
            alt="logo"
            height={500}
            width={500}
            className="h-14 w-auto"
          />

          <div className="flex items-center gap-5">
            {/* <Button>Afiliado</Button> */}

            <Link href="https://api.whatsapp.com/send?phone=5517996484654">
              <Button variant="secondary">Anuncie</Button>
            </Link>

            <Link href="/dashboard/login">
              <Button>Restaurante</Button>
            </Link>
          </div>
        </div>
      </div>

      <Drawer>
        <DrawerTrigger asChild className="flex tablet:hidden">
          <Button size="icon" className="fixed right-2 top-2">
            <Menu size={32} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-10 h-[calc(100svh-80px)] p-5 mx-auto">
            <Image
              src="/logo-banner.svg"
              alt="logo"
              height={500}
              width={500}
              className="h-auto w-32 mx-auto"
            />

            <div className="flex flex-col items-center justify-center gap-10 my-auto h-full ">
              {/* <Button>Afiliado</Button> */}

              <Link href="/advertiser/login">
                <p className="text-primary font-semibold border-b text-4xl">
                  Anunciante
                </p>
              </Link>

              <Link href="/dashboard/login">
                <p className="text-primary font-semibold border-b text-4xl">
                  Restaurante
                </p>
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
