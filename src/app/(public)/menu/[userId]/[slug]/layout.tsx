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
      enableSystem
      defaultTheme="dark"
    >
      <div className="flex h-full max-w-lg items mx-auto relative">
        <div className="container h-full mx-auto">{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
