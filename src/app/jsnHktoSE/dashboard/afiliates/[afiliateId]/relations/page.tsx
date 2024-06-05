import AfiliateRelationsPagination from "@/components/admin/afiliates/relations/AfiliateRelationsPagination";

interface AdvertisersPageProps {
  searchParams?: {
    page?: string;
  };
  params?: {
    afiliateId: string;
  };
}

const AdvertisersPage = async ({
  params,
  searchParams,
}: AdvertisersPageProps) => {
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="relative w-full ">
      <AfiliateRelationsPagination
        page={page}
        query={{
          where: {
            afiliateId: params?.afiliateId,
          },
        }}
      />
    </div>
  );
};

export default AdvertisersPage;
