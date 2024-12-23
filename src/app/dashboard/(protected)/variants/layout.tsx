"use client";
import Navbar from "@/components/restaurant/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/dashboard/restaurants" },
    { title: "Variações", route: "/dashboard/variants" },
  ];

  return (
    <div className="min-h-svh overflow-hidden">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container h-[calc(100svh-65px)] overflow-y-auto py-5">
        {children}
      </div>
    </div>
  );
};

export default Layout;
