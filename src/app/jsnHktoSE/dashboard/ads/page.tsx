import ActionBar from "@/components/admin/ActionBar";
import { Separator } from "@/components/ui/separator";
import { fetchRegions } from "@/actions/region/fetchRegions";
import { fetchAds } from "@/actions/ad/fetchAds";
import Paginate from "@/components/misc/Paginate";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdRow from "@/components/admin/tableRows/Ad";
import { Ad, AdvertiserAccount } from "@prisma/client";

interface AdminPageProps {
  searchParams?: {
    page: string;
    title?: string;
  };
}

interface AdReturn extends Ad {
  AdvertiserAccount: AdvertiserAccount;
}

interface AdFetchReturn {
  ads: AdReturn[];
  pages: number;
}

const AdminDashboard = async ({ searchParams }: AdminPageProps) => {
  const regions = await fetchRegions();
  const page = Number(searchParams?.page || 1);
  const title = searchParams?.title || "";

  const { ads, pages } = await fetchAds<AdFetchReturn>({
    page: page - 1,
    take: 20,
    query: title
      ? {
          where: {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          include: {
            AdvertiserAccount: true,
          },
          orderBy: {
            title: "asc",
          },
        }
      : {
          orderBy: {
            title: "asc",
          },
          include: {
            AdvertiserAccount: true,
          },
        },
  });

  console.log(ads);

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5 relative">
      <ActionBar regions={regions} />

      <Separator />

      <div className="flex flex-col gap-5 h-[calc(100svh-120px)] overflow-y-auto pb-20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>

              <TableHead>Título</TableHead>

              <TableHead>Região</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Anunciante</TableHead>

              <TableHead>Editar</TableHead>

              <TableHead>Deletar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ads.map((ad) => (
              <AdRow ad={ad} regions={regions} key={ad.id} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </section>
  );
};

export default AdminDashboard;
