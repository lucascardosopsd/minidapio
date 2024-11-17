import { ReactNode } from "react";
import { ThemeProvider } from "@/components/misc/ThemeProvider";

import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await useCurrentUser();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem
      defaultTheme="dark"
    >
      {children}
    </ThemeProvider>
  );
};

export default Layout;
