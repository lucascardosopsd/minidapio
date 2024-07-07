"use client";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ThemeToggle } from "../misc/ThemeToggle";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Headset, LogOutIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NavbarProps {
  breadcrumb?: BreadcrumbRouteProps[];
}

const Navbar = ({ breadcrumb }: NavbarProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="container flex justify-between items-center p-4 border-b border-border h-16">
      <div className="flex gap-2">
        {breadcrumb?.map((route, index) => (
          <Link
            href={route.route}
            onClick={() => router.push(route.route)}
            className="gap-2 text-muted-foreground hidden tablet:flex"
            key={index}
          >
            <p className="hover:text-accent-foreground transition">
              {route.title}
            </p>
            <p>/</p>
          </Link>
        ))}

        <Link href="/dashboard/restaurants">
          <p className="block tablet:hidden text-muted-foreground">Início</p>
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <ThemeToggle />

        <Link
          href="https://api.whatsapp.com/send?phone=5517988421625"
          className="w-full"
          target="_blank"
        >
          <Button className="gap-2">
            <span className="hidden tablet:block">Suporte</span> <Headset />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user?.image && (
              <Avatar>
                <AvatarImage src={session?.user?.image!} />
              </Avatar>
            )}

            {!session?.user?.image && (
              <div className="flex-1 w-full">
                <span className="rounded-full h-12 w-12 border border-border transition hover:border-primary flex items-center justify-center">
                  <p className="text-lg">{session?.user?.name?.slice(0, 1)}</p>
                </span>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-2 space-y-2">
            <p>{session?.user?.name}</p>

            <Button
              variant="outline"
              onClick={() => {
                signOut({
                  callbackUrl: `${process.env.NEXT_PUBLIC_HOST!}/auth/login`,
                });
              }}
              size="sm"
              className="flex items-center gap-2 justify-center w-full"
            >
              <LogOutIcon size={18} />

              <p>Sair</p>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
