import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

interface NavbarProps {
  breadcrumb?: BreadcrumbRouteProps[];
}

const Navbar = ({ breadcrumb }: NavbarProps) => {
  return (
    <div className="container flex justify-between items-center p-4 border-b border-border h-16">
      {breadcrumb?.map((route, index) => (
        <Link href={route.route} className="flex gap-2 text-muted-foreground ">
          <p className="hover:text-accent-foreground transition">
            {route.title}
          </p>
          <p>/</p>
        </Link>
      ))}
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
