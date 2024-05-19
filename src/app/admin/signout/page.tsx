"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const SignOutPage = () => {
  signOut();
  redirect("/admin/login");
};

export default SignOutPage;
