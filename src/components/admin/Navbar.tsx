"use client";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "../misc/ThemeToggle";
import { Avatar, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="container flex justify-end items-center p-4 border-b border-border h-16">
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <Avatar>
          <AvatarImage src={session?.user?.image!} />
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
