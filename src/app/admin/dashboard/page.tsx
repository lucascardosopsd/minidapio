import ActionBar from "@/components/admin/ActionBar";
import { Separator } from "@/components/ui/separator";
import { fetchRegions } from "@/actions/region/fetchRegions";
import { fetchAds } from "@/actions/ad/fetchAds";
import AdCard from "@/components/admin/Cards/Ad";
import Paginate from "@/components/misc/Pagination";

interface AdminPageProps {
  searchParams?: {
    page: string;
    name?: string;
  };
}

const AdminDashboard = async ({ searchParams }: AdminPageProps) => {
  const regions = await fetchRegions();
  const page = Number(searchParams?.page || 1);

  const { ads, pages } = await fetchAds({
    page: page - 1,
    take: 10,
  });

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5 relative">
      <ActionBar regions={regions} />

      <Separator />

      <div className="flex flex-col gap-5 h-[calc(100svh-120px)]">
        {ads.map((ad) => (
          <AdCard ad={ad} regions={regions} key={ad.id} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </section>
  );
};

export default AdminDashboard;
