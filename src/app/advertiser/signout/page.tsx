"use client";
import { signOut, useSession } from "next-auth/react";

const SignOutPage = () => {
  const session = useSession();

  if (session) {
    signOut({
      redirect: true,
      callbackUrl: "/advertiser/login",
    });
  }
};

export default SignOutPage;
