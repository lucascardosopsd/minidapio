import { ReactNode } from "react";
import { ThemeProvider } from "@/components/misc/ThemeProvider";

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
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
