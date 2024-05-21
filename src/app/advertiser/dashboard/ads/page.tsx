import { fetchAds } from "@/actions/ad/fetchAds";
import { getUserServerSession } from "@/actions/session/getUserServerSession";
import AdCard from "@/components/advertiser/cards/Ad";
import Paginate from "@/components/misc/Paginate";
import SearchField from "@/components/misc/SearchField";
import { Separator } from "@/components/ui/separator";

interface UsersPageProps {
  searchParams?: {
    page: string;
    title?: string;
  };
}

const AdsPage = async ({ searchParams }: UsersPageProps) => {
  const page = Number(searchParams?.page || 1);

  const user = await getUserServerSession();

  const { ads, pages } = await fetchAds({
    page: page - 1,
    take: 10,
    query: {
      where: {
        userId: user?.id,
      },
    },
  });

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5 relative">
      <div className="flex justify-between w-full gap-5 items-center">
        <p className="text-2xl">Anúncios</p>
        <SearchField keyName="name" placeholder="Busque um nome" />
      </div>

      <Separator />

      <div className="flex flex-col gap-5 h-svh overflow-y-auto pb-20">
        {ads.map((ad) => (
          <AdCard ad={ad} key={ad.id} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </section>
  );
};

export default AdsPage;
