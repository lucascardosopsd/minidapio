"use client";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ThemeToggle } from "../misc/ThemeToggle";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

interface NavbarProps {
  breadcrumb?: BreadcrumbRouteProps[];
}

const Navbar = ({ breadcrumb }: NavbarProps) => {
  const router = useRouter();

  return (
    <div className="container flex justify-between items-center p-4 border-b border-border h-16">
      <div className="flex gap-2">
        {breadcrumb?.map((route, index) => (
          <Link
            href={route.route}
            onClick={() => router.push(route.route)}
            className="flex gap-2 text-muted-foreground "
            key={index}
          >
            <p className="hover:text-accent-foreground transition">
              {route.title}
            </p>
            <p>/</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <Button
          variant="outline"
          onClick={() => {
            signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_HOST!}/login` });
          }}
          size="sm"
          className="group hover:bg-primary hover:border-primary transition"
        >
          <LogOutIcon
            size={18}
            className="text-primary group-hover:text-background "
          />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
