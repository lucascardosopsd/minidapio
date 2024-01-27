import Navbar from "@/components/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/dashboard" },
  ];

  return (
    <div className="flex flex-col">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
