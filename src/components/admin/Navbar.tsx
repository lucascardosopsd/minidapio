"use server";
import Link from "next/link";
import { ThemeToggle } from "../misc/ThemeToggle";
import { Avatar, AvatarImage } from "../ui/avatar";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="container flex justify-end items-center p-4 border-b border-border h-16">
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <Link href="/user-profile">
          <Avatar className="border border-primary">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
