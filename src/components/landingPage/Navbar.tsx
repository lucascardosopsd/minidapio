import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { ChevronRight, Menu } from "lucide-react";
import { ThemeToggle } from "../misc/ThemeToggle";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  const user = await useCurrentUser();
  return (
    <>
      <div className="hidden tablet:flex px-[16px] tablet:px-[80px] desktop:px-[162px] h-20 sticky top-0 left-0 w-full backdrop-blur-md bg-background/50 z-50 border-b border-foreground/5 ">
        <div className="flex items-center justify-between mx-auto w-full p-2">
          <p className="font-semibold text-primary">Minidapio</p>

          <div className="flex items-center gap-5">
            <Link href={!user ? "/sign-in" : "/dashboard/restaurants"}>
              <Button
                className={cn(
                  "border border-border p-3 rounded-md group hover:border-primary bg-background min-w-44",
                  user && "!bg-primary text-background border-none"
                )}
              >
                <p
                  className={cn(
                    "text-primary group-hover:text-background",
                    user && "text-background"
                  )}
                >
                  {!user ? "Entrar" : "Acessar Painel"}
                </p>
                <ChevronRight
                  className={cn(
                    "text-primary group-hover:text-background",
                    user && "text-background"
                  )}
                />
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

              <Link
                href="/dashboard/restaurants"
                className="order-1 tablet:order-2"
              >
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
