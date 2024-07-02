"use server";
import { Separator } from "@/components/ui/separator";
import InputSearch from "@/components/restaurant/InputSearch";
import { fetchUserCategoriesByQuery } from "@/actions/category/fetchUserCategoriesByQuery";
import BottomFade from "@/components/restaurant/BottomFade";
import ItemsActions from "@/components/restaurant/ItemsActions";
import Paginate from "@/components/misc/Paginate";
import { fetchManyItems } from "@/actions/item/fetchManyItems";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ItemRow from "@/components/restaurant/tableRows/Item";

interface PageProps {
  params: {
    restaurantId: string;
  };
  searchParams?: {
    page: string;
    title?: string;
    description?: string;
    active?: string;
    price?: string;
    sale?: string;
    categoryId?: string;
  };
}

export default async function Restaurant({
  params: { restaurantId },
  searchParams,
}: PageProps) {
  const page = Number(searchParams?.page || 1);

  const categories = await fetchUserCategoriesByQuery({
    where: {
      restaurantId,
    },
  });

  const { items, pages } = await fetchManyItems({
    take: 20,
    page: page - 1,
    query: {
      where: {
        title: {
          contains: searchParams?.title && searchParams?.title,
          mode: "insensitive",
        },
        description: {
          contains: searchParams?.description && searchParams?.description,
          mode: "insensitive",
        },
        active:
          searchParams?.active && searchParams?.active == "true" ? true : false,
        price: searchParams?.price
          ? parseFloat(searchParams?.price!)
          : undefined,
        sale: searchParams?.sale && searchParams?.sale == "true" ? true : false,
        categoryId: searchParams?.categoryId && searchParams?.categoryId,
        restaurantId,
      },
    },
  });

  return (
    <main className="flex flex-col gap-4 pt-5 h-[90svh] ">
      <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-0 py-4 tablet:p-0 justify-between w-full items-center">
        <p>Items</p>

        <InputSearch restaurantId={restaurantId} />
      </div>
      <Separator />

      <ItemsActions categories={categories} items={items} visible />

      <div className="relative">
        <div className="w-full mx-auto h-full tablet:h-[58svh] tablet:overflow-y-auto space-y-2 pb-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Img</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="text-center">Descrito</TableHead>
                <TableHead className="text-center max-w-32">Preço</TableHead>
                <TableHead className="text-center">Promoção</TableHead>
                <TableHead className="text-center">Destaque</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <ItemRow categories={categories} item={item} />
              ))}
            </TableBody>
          </Table>

          {!items.length && <p>Nenhum item encontrado.</p>}
        </div>
        <BottomFade />
      </div>
      <Paginate current={page} pages={pages} />
    </main>
  );
}
