import { fetchRegions } from "@/actions/region/fetchRegions";
import AdvertisersPagination from "@/components/admin/advertisers/AdvertisersPagination";

interface AdvertisersPageProps {
  searchParams?: {
    page: string;
    name?: string;
    orderBy?: "payment";
    payment?: "paid" | "unpaid" | "";
  };
}

const AdvertisersPage = async ({ searchParams }: AdvertisersPageProps) => {
  const page = Number(searchParams?.page || 1);
  const name = searchParams?.name || "";
  const paymentFilter = searchParams?.payment || null;

  let orderBy: { [key: string]: string } = {};

  if (searchParams?.orderBy) {
    orderBy[searchParams.orderBy] = "asc";
  } else {
    orderBy = {
      name: "asc",
    };
  }

  const regions = await fetchRegions();

  return (
    <div className="relative w-full ">
      <AdvertisersPagination
        paymentFilter={paymentFilter}
        page={page}
        regions={regions}
        query={
          name
            ? {
                where: {
                  name: {
                    contains: name,
                    mode: "insensitive",
                  },
                },
                orderBy: orderBy,
                include: {
                  region: true,
                },
              }
            : {
                orderBy: orderBy,
                include: {
                  region: true,
                },
              }
        }
      />
    </div>
  );
};

export default AdvertisersPage;
