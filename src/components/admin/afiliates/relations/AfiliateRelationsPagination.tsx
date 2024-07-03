import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import { Afiliate, Prisma, User } from "@prisma/client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AfiliateRelationsActionBar from "./ActionBar";
import { fetchManyAdvertisers } from "@/actions/advertiser/fetchManyAdvertisers";
import AdvertiserRow from "../../tableRows/Advertiser";
interface AfiliateRelationsPaginationProps {
  page: number;
  query?: Prisma.AdvertiserAccountFindManyArgs;
  afiliate: Afiliate;
  user: User;
}

const AfiliateRelationsPagination = async ({
  page,
  query,
  afiliate,
  user,
}: AfiliateRelationsPaginationProps) => {
  const { advertisers, pages } = await fetchManyAdvertisers({
    page: page - 1,
    take: 10,
    query,
  });

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <AfiliateRelationsActionBar user={user} />

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anunciante</TableHead>

                <TableHead>ID</TableHead>

                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {advertisers.map((advertiser) => (
                <AdvertiserRow
                  advertiser={advertiser}
                  afiliate={afiliate}
                  key={advertiser.id}
                  user={user}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default AfiliateRelationsPagination;
