"use client";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ThemeToggle } from "../misc/ThemeToggle";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Bolt, ConciergeBell, Gauge, Headset, LogOutIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UpgradeButton from "./UpgradeButton";
import { SignOutButton, useUser } from "@clerk/nextjs";

interface NavbarProps {
  breadcrumb?: BreadcrumbRouteProps[];
}

const Navbar = ({ breadcrumb }: NavbarProps) => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="container flex justify-between items-center p-4 border-b border-border h-16">
      <div className="flex gap-2">
        <div className="hidden tablet:flex gap-2">
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
      </div>
      <div className="flex gap-2 items-center mx-auto justify-between w-full tablet:w-auto tablet:m-0 tablet:justify-end">
        <UpgradeButton />

        <div className="hidden tablet:block">
          <ThemeToggle />
        </div>

        <Link
          href="https://web.whatsapp.com/send?phone=17996484654"
          className="tablet:w-full"
          target="_blank"
        >
          <Button className="gap-2 rounded-full">
            <span>Suporte</span> <Headset />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {user?.imageUrl && (
              <Avatar className="border border-primary">
                <AvatarImage src={user.imageUrl} />
              </Avatar>
            )}

            {!user?.imageUrl && (
              <div className="flex-1 w-full">
                <span className="rounded-full h-12 w-12 border border-border transition hover:border-primary flex items-center justify-center">
                  <p className="text-lg">{user?.firstName?.slice(0, 1)}</p>
                </span>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 flex flex-col gap-2">
            <p className="w-full p-2 border border-primary rounded-lg text-center cursor-default">
              {user?.firstName}
            </p>

            {user?.publicMetadata.role == "admin" && (
              <Link href="/jsnHktoSE/dashboard">
                <Button className="w-full gap-2" variant="outline">
                  <Gauge /> Painel ADM
                </Button>
              </Link>
            )}

            <Link href="/dashboard/restaurants">
              <Button className="w-full gap-2" variant="outline">
                <ConciergeBell /> Restaurantes
              </Button>
            </Link>

            <Link href="/dashboard/settings">
              <Button className="w-full gap-2" variant="outline">
                <Bolt /> Configurações
              </Button>
            </Link>

            <SignOutButton redirectUrl="/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 justify-center w-full"
              >
                <LogOutIcon size={18} />
                <p>Sair</p>
              </Button>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
