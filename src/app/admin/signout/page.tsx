"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SignOutPage = () => {
  const session = useSession();

  if (session) {
    signOut();
  }
  redirect("/admin/login");
};

export default SignOutPage;
