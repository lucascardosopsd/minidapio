import UserPagination from "@/components/admin/users/userPagination";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

interface UsersPageProps {
  searchParams?: {
    page: string;
  };
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const page = Number(searchParams?.page || 1);

  const fallback = (
    <div className="flex items-center gap-5  h-[calc(100svh-120px)]">
      <p className="text-2xl">Usuários</p>

      <Separator />

      <div className="w-full h-32 bg-mutted rounded border" />
      <div className="w-full h-32 bg-mutted rounded border" />
      <div className="w-full h-32 bg-mutted rounded border" />
    </div>
  );

  return (
    <div className="relative w-full">
      <Suspense fallback={fallback}>
        <UserPagination page={page} />
      </Suspense>
    </div>
  );
};

export default UsersPage;
