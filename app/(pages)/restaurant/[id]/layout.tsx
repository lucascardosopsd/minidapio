import Navbar from "@/components/Navbar";
import { BreadcrumbRouteProps } from "@/types/breacrumb";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const Layout = ({ params: { id }, children }: LayoutProps) => {
  const breadcrumb: BreadcrumbRouteProps[] = [
    { title: "Início", route: "/dashboard" },
    { title: "Restaurante", route: `/restaurant/${id}` },
  ];

  return (
    <div className="flex flex-col h-svh">
      <Navbar breadcrumb={breadcrumb} />
      <div className="container h-full">{children}</div>
    </div>
  );
};

export default Layout;
