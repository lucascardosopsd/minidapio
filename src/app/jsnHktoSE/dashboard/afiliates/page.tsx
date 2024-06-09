import AfiliatePagination from "@/components/admin/afiliates/AfiliatesPagination";

interface AfiliatesPageProps {
  searchParams?: {
    page: string;
    name?: string;
  };
}

const AfiliatesPage = async ({ searchParams }: AfiliatesPageProps) => {
  const page = Number(searchParams?.page || 1);
  const name = searchParams?.name || "";

  return (
    <div className="relative w-full ">
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
                orderBy: {
                  name: "asc",
                },
              }
            : {
                orderBy: {
                  name: "asc",
                },
              }
        }
      />
    </div>
  );
};

export default AfiliatesPage;
