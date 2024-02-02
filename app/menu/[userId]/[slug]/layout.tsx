import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const Layout = ({ params: { id }, children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="container h-full">{children}</div>
    </div>
  );
};

export default Layout;
