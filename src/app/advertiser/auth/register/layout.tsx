import { ThemeProvider } from "@/components/misc/ThemeProvider";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem
      defaultTheme="dark"
    >
      <div className="container">{children}</div>
    </ThemeProvider>
  );
};

export default Layout;
