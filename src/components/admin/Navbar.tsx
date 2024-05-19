"use client";
import { ThemeToggle } from "../misc/ThemeToggle";

interface NavbarProps {
  signOutcallbackUrl?: string;
}

const Navbar = ({ signOutcallbackUrl }: NavbarProps) => {
  return (
    <div className="container flex justify-end items-center p-4 border-b border-border h-16">
      <div className="flex gap-2 items-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
