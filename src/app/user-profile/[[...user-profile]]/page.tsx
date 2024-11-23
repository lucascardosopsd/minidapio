"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const UserProfilePage = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Button
        variant="outline"
        className="h-auto mr-2"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </Button>
      <UserProfile path="/user-profile" />
    </div>
  );
};

export default UserProfilePage;
