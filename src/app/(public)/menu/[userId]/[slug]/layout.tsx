import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const Layout = ({ params: { id }, children }: LayoutProps) => {
  return <div className="mx-auto max-w-[600px]:">{children}</div>;
};

export default Layout;
