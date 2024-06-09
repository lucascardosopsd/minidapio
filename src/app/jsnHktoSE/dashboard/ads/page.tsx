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

interface AdminPageProps {
  searchParams?: {
    page: string;
    title?: string;
  };
}

const AdminDashboard = async ({ searchParams }: AdminPageProps) => {
  const regions = await fetchRegions();
  const page = Number(searchParams?.page || 1);
  const title = searchParams?.title || "";

  const { ads, pages } = await fetchAds({
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
          orderBy: {
            title: "asc",
          },
        }
      : {
          orderBy: {
            title: "asc",
          },
        },
  });

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
