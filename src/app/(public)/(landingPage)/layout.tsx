import Navbar from "@/components/landingPage/Navbar";
import { ThemeProvider } from "@/components/misc/ThemeProvider";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const Layout = ({ params: { id }, children }: LayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="light"
    >
      <div className="flex flex-col h-full relative w-full">
        <Navbar />
        <div className="h-full mx-auto flex flex-col w-full">{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
