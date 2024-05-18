import { fetchRegions } from "@/actions/region/fetchRegions";
import RegionCard from "@/components/advertiser/Cards/Region";
import RegionsActionBar from "@/components/advertiser/region/ActionBar";
import { Separator } from "@/components/ui/separator";

const RegionsPage = async () => {
  const regions = await fetchRegions();

  return (
    <section className="space-y-5 w-full h-full pt-5">
      <RegionsActionBar />

      <Separator />

      <div className="flex flex-col h-[calc(100svh-170px)] overflow-y-auto gap-5">
        {regions.map((region) => (
          <RegionCard region={region} />
        ))}
      </div>
    </section>
  );
};

export default RegionsPage;
