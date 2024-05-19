import ActionBar from "@/components/advertiser/ActionBar";
import { Separator } from "@/components/ui/separator";
import { fetchRegions } from "@/actions/region/fetchRegions";

const AdvertiserDashboard = async () => {
  const regions = await fetchRegions();

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5">
      <ActionBar regions={regions} />

      <Separator />
    </section>
  );
};

export default AdvertiserDashboard;
