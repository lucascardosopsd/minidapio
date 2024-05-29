import AfiliatePagination from "@/components/admin/afiliates/AfiliatesPagination";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

interface AfiliatesPageProps {
  searchParams?: {
    page: string;
    name?: string;
  };
}

const AfiliatesPage = async ({ searchParams }: AfiliatesPageProps) => {
  const page = Number(searchParams?.page || 1);
  const name = searchParams?.name || "";

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
    <div className="relative w-full ">
      <Suspense fallback={fallback}>
        <AfiliatePagination
          page={page}
          query={
            name
              ? {
                  where: {
                    name: {
                      contains: name,
                      mode: "insensitive",
                    },
                  },
                }
              : {}
          }
        />
      </Suspense>
    </div>
  );
};

export default AfiliatesPage;
