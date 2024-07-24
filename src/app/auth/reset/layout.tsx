import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="hidden tablet:flex border-b w-full px-[16px] tablet:px-[80px] desktop:px-[162px] h-20">
        <div className="flex items-center justify-between mx-auto w-full p-2">
          <Link href="/">
            <Image
              src="/logo-banner.svg"
              alt="logo"
              height={500}
              width={500}
              className="h-14 w-auto"
            />
          </Link>
        </div>
      </div>
      {children}
    </>
  );
};

export default Layout;
