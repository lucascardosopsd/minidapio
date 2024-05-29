import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import SearchField from "@/components/misc/SearchField";
import { Prisma } from "@prisma/client";
import { fetchManyAfiliates } from "@/actions/afiliate/fetchManyAfiliates";
import AfiliateCard from "../cards/Afiliate";

interface AfiliatesPaginationprops {
  page: number;
  query?: Prisma.AfiliateFindManyArgs;
}

const AfiliatesPagination = async ({
  page,
  query,
}: AfiliatesPaginationprops) => {
  const { afiliates, pages } = await fetchManyAfiliates({
    page: page - 1,
    take: 10,
    query,
  });

  return (
    <>
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <div className="flex justify-between w-full gap-5 items-center">
          <p className="text-2xl">Afiliados</p>
          <SearchField keyName="name" placeholder="Busque um nome" />
        </div>

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          {afiliates.map((afiliate) => (
            <AfiliateCard afiliate={afiliate} key={afiliate.id} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default AfiliatesPagination;
