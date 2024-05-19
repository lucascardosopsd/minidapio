import ActionBar from "@/components/admin/ActionBar";
import { Separator } from "@/components/ui/separator";
import { fetchRegions } from "@/actions/region/fetchRegions";
import { fetchAds } from "@/actions/ad/fetchAds";
import AdCard from "@/components/admin/Cards/Ad";

const AdvertiserDashboard = async () => {
  const regions = await fetchRegions();
  const ads = await fetchAds();

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5">
      <ActionBar regions={regions} />

      <Separator />

      <div className="flex flex-col gap-5">
        {ads.map((ad) => (
          <AdCard ad={ad} regions={regions} />
        ))}
      </div>
    </section>
  );
};

export default AdvertiserDashboard;
