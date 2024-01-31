import Navbar from "@/components/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/restarants" },
  ];

  return (
    <div className="flex flex-col h-svh">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;