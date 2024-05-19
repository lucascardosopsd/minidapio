"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ImSpinner2 } from "react-icons/im";
import { FaGoogle } from "react-icons/fa6";

const GoogleLoginButton = () => {
  const { status } = useSession();

  return (
    <Button
      className="w-full"
      onClick={() => signIn("google")}
      disabled={status == "loading"}
    >
      {status == "loading" ? (
        <ImSpinner2 className="animate-spin h-5 w-5 text-background" />
      ) : (
        <>
          <FaGoogle className="mr-2" />
          Continuar com Google
        </>
      )}
    </Button>
  );
};

export default GoogleLoginButton;
