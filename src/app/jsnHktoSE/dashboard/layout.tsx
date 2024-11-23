"use server";
import { ReactNode } from "react";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/misc/ReusableSidebar";
import { adminSidebarOptions } from "@/constants/adminSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-svh w-full">
      <Sidebar
        options={adminSidebarOptions}
        redirectLogout="/jsnHktoSE/login"
      />
      <div className="w-full">
        <Navbar />
        <div className="flex flex-col px-10 items-center justify-center h-[calc(100svh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
