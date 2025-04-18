"use server";
import { Separator } from "@/components/ui/separator";
import InputSearch from "@/components/restaurant/InputSearch";
import { fetchCategoriesByQuery } from "@/actions/category/fetchCategoriesByQuery";
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
import SearchItemRow from "@/components/search/restaurant/ItemRow";
import { Category, MenuItem } from "@prisma/client";

interface ItemProps extends MenuItem {
  Category: Category;
}

interface PageProps {
  params: Promise<{
    restaurantId: string;
  }>;
  searchParams: Promise<{
    page: string;
    title?: string;
    description?: string;
    active?: string;
    price?: string;
    sale?: string;
    categoryId?: string;
  }>;
}

interface FetchItemsProps extends MenuItem {
  Category: Category;
}

interface FetchManyItemsResProps {
  items: FetchItemsProps[];
  pages: number;
}

export default async function Restaurant({ params, searchParams }: PageProps) {
  const sParams = await searchParams;
  const { restaurantId } = await params;
  const page = Number(sParams.page || 1);

  const { categories } = await fetchCategoriesByQuery({
    page: 0,
    take: 10000,
    query: {
      where: {
        restaurantId,
      },
    },
  });

  const { items, count } = await fetchManyItems({
    take: 20,
    skip: (page - 1) * 20,
    where: {
      name: {
        contains: sParams.title && sParams.title,
        mode: "insensitive",
      },
      description: {
        contains: sParams.description && sParams.description,
        mode: "insensitive",
      },
      isAvailable: sParams.active && sParams.active == "true" ? true : false,
      price: sParams.price ? parseFloat(sParams.price!) : undefined,
      categoryId: sParams.categoryId && sParams.categoryId,
      restaurantId,
    },
    include: {
      category: true,
    },
  });

  const pages = Math.ceil(count / 20);

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
                <TableHead>Categoria</TableHead>
                <TableHead className="text-center max-w-32">Preço</TableHead>
                <TableHead className="text-center">Promoção</TableHead>
                <TableHead className="text-center">Destaque</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Editar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const category = categories.find(cat => cat.id === item.categoryId);
                return (
                  <SearchItemRow
                    categories={categories}
                    item={{
                      ...item,
                      Category: category,
                      title: item.name,
                      active: item.isAvailable,
                      highlight: false,
                      sale: false,
                      salePrice: null,
                      order: null,
                      image: "",
                    } as unknown as ItemProps}
                    key={item.id}
                  />
                );
              })}
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
