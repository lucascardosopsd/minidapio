import { ReactNode } from "react";
import { ThemeProvider } from "@/components/misc/ThemeProvider";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/authProviders";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/dashboard/login");
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
