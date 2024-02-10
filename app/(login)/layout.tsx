import { useSession } from "@/hooks/useSession";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await useSession();

  return (
    <div className="container">
      <p>{session?.user && "Logado"}</p>
      {children}
    </div>
  );
};

export default Layout;
