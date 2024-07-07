"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ImSpinner2 } from "react-icons/im";
import { FaGoogle } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { ButtonVariants } from "@/types/button";

const GoogleLoginButton = ({
  className,
  variant,
}: {
  className?: string;
  variant?: ButtonVariants;
}) => {
  const { status } = useSession();

  return (
    <Button
      className={cn("w-full", className)}
      onClick={() => signIn("google")}
      disabled={status == "loading"}
      variant={variant}
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
