import AdvertisersPagination from "@/components/admin/advertisers/AdvertisersPagination";

interface AdvertisersPageProps {
  searchParams?: {
    page: string;
    name?: string;
  };
}

const AdvertisersPage = async ({ searchParams }: AdvertisersPageProps) => {
  const page = Number(searchParams?.page || 1);
  const name = searchParams?.name || "";

  return (
    <div className="relative w-full ">
      <AdvertisersPagination
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
    </div>
  );
};

export default AdvertisersPage;
