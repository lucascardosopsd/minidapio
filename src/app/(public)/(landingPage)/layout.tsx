import Navbar from "@/components/landingPage/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const Layout = ({ params: { id }, children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full relative w-full">
      <Navbar />
      <div className="container h-full mx-auto flex flex-col">{children}</div>
    </div>
  );
};

export default Layout;
