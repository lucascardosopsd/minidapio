import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { ChevronRight, Menu } from "lucide-react";
import { ThemeToggle } from "../misc/ThemeToggle";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Navbar = async () => {
  const user = await useCurrentUser();
  return (
    <>
      <div className="hidden tablet:flex w-full px-[16px] tablet:px-[80px] desktop:px-[162px] h-20">
        <div className="flex items-center justify-between mx-auto w-full p-2">
          <p className="font-semibold text-primary">Minidapio</p>

          <div className="flex items-center gap-5">
            <Link href={!user ? "/sign-in" : "/dashboard/restaurants"}>
              <Button
                className="border border-border p-3 rounded-md dark:bg-zinc-950 group hover:border-primary hover:bg-background min-w-44"
                variant="outline"
              >
                <p className="text-primary">{!user ? "Entrar" : "Dashboard"}</p>
                <ChevronRight className="group-hover:text-primary text-border" />
              </Button>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>

      <Drawer>
        <DrawerTrigger className="flex tablet:hidden z-50">
          <div className="fixed right-2 top-2 p-1 rounded bg-background border border-border text-primary">
            <Menu size={32} />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-10 h-[calc(100svh-80px)] p-5 mx-auto">
            <p className="text-2xl text-primary text-center font-semibold">
              Minidapio
            </p>

            <div className="flex flex-col items-center justify-center gap-10 my-auto h-full ">
              {/* <Button>Afiliado</Button> */}

              <Link href="/dashboard" className="order-1 tablet:order-2">
                <p className="text-primary font-semibold border-b text-4xl ">
                  Dashboard
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
