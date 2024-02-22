"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PaginationContent,
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";
import { useState } from "react";

interface PaginateProps {
  initialPage?: number;
  totalItems: number;
  itemsPerPage: number;
}

const Paginate = ({ initialPage, totalItems, itemsPerPage }: PaginateProps) => {
  const [page, setPage] = useState(initialPage || 1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleNextPage = () => {
    if (page > totalItems / itemsPerPage) {
      return;
    }

    setPage(page + 1);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page + 1).toString());
    router.push(`${pathname}?${params}`);
  };

  const handlePrevPage = () => {
    if (page == 1) {
      return;
    }

    setPage(page - 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page - 1).toString());
    router.push(`${pathname}?${params}`);
  };

  const handleSetPage = (page: number) => {
    setPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious title="Anterior" onClick={handlePrevPage} />
        </PaginationItem>

        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handleSetPage(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink className="text-primary">{page}</PaginationLink>
        </PaginationItem>

        {page <= totalItems / itemsPerPage - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handleSetPage(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext title="Próximo" onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;
