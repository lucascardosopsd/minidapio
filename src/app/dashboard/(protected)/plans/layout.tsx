"use client";
import BottomFade from "@/components/restaurant/BottomFade";
import Navbar from "@/components/restaurant/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/dashboard/restaurants" },
  ];

  return (
    <div>
      <Navbar breadcrumb={breadcrumb} />
      <div className="container h-[calc(100svh-70px)] flex overflow-y-auto py-5">
        {children}
      </div>
      <BottomFade />
    </div>
  );
};

export default Layout;
