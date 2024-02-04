import Navbar from "@/components/Navbar";
import { restaurants } from "@/mock/restaurants";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ReactNode } from "react";

interface LayoutProps {
  params: {
    id: number;
  };
  children: ReactNode;
}

const Layout = ({ children, params: { id } }: LayoutProps) => {
  const restaurant = restaurants.filter((restaurant) => restaurant.id == id)[0];

  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/restaurants" },
    { title: restaurant.title, route: "/restarant/" + id },
  ];

  return (
    <div className="flex flex-col h-full">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
