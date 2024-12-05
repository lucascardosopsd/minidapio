import Navbar from "@/components/landingPage/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      <div className="h-full mx-auto flex flex-col w-full">{children}</div>
    </div>
  );
};

export default Layout;
