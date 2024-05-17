"use client";
import { ThemeToggle } from "../misc/ThemeToggle";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="container flex justify-end items-center p-4 border-b border-border h-16">
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <Button
          variant="outline"
          onClick={() => {
            signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_HOST!}/` });
          }}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
