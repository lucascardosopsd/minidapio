import Navbar from "@/components/restaurant/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/restaurants" },
  ];

  return (
    <div className="flex flex-col h-full">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
