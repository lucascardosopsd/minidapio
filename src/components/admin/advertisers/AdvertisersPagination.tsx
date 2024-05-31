import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";
import { fetchManyAdvertisers } from "@/actions/advertiser/fetchManyAdvertisers";
import AdvertiserCard from "../cards/Advertiser";

import AdvertiserActionBar from "./ActionBar";
interface AdvertisersPaginationprops {
  page: number;
  query?: Prisma.AdvertiserAccountFindManyArgs;
}

const AdvertisersPagination = async ({
  page,
  query,
}: AdvertisersPaginationprops) => {
  const { advertisers, pages } = await fetchManyAdvertisers({
    page: page - 1,
    take: 10,
    query: {
      ...query,
      include: {
        AfiliateAdvertiserAccount: true,
        user: true,
      },
    },
  });

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <AdvertiserActionBar />

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          {advertisers.map((advertiser) => (
            <AdvertiserCard
              advertiser={advertiser}
              key={advertiser.id}
              user={advertiser.user}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default AdvertisersPagination;
