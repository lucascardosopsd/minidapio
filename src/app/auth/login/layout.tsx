import { ThemeProvider } from "@/components/misc/ThemeProvider";
import { nextAuthOptions } from "@/lib/authProviders";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/dashboard/restaurants");
  }

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
