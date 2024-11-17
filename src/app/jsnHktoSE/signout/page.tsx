"use client";
import { useClerk } from "@clerk/nextjs";

const SignOutPage = () => {
  const { signOut } = useClerk();

  signOut({ redirectUrl: "/" });
};

export default SignOutPage;
