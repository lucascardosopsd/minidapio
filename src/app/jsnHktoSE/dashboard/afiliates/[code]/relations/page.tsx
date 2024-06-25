import { fetchAfiliatesByQuery } from "@/actions/afiliate/fetchAfiliatesByQuery";
import { fetchUser } from "@/actions/user/fetchUser";
import AfiliateRelationsPagination from "@/components/admin/afiliates/relations/AfiliateRelationsPagination";

interface AdvertisersPageProps {
  searchParams?: {
    page?: string;
  };
  params?: {
    code: string;
  };
}

const AdvertisersPage = async ({
  params,
  searchParams,
}: AdvertisersPageProps) => {
  const page = Number(searchParams?.page) || 1;

  if (!params?.code) {
    throw new Error("invalid code");
  }

  const afiliate = await fetchAfiliatesByQuery({
    query: { where: { code: Number(params?.code) } },
  });

  const user = await fetchUser({ id: afiliate[0].userId });

  return (
    <div className="relative w-full ">
      <AfiliateRelationsPagination
        page={page}
        query={{
          where: {
            afiliateCode: Number(params?.code),
          },
        }}
        afiliate={afiliate[0]}
        user={user!}
      />
    </div>
  );
};

export default AdvertisersPage;
