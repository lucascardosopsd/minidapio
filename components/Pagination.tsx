"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PaginationContent,
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "./ui/pagination";
import { useState } from "react";

interface PaginateProps {
  initialPage?: number;
  itemsCount: number;
  itemsPerPage: number;
}

const Paginate = ({ initialPage, itemsCount, itemsPerPage }: PaginateProps) => {
  const [page, setPage] = useState(initialPage || 1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const totalPages = Math.round(itemsCount / itemsPerPage);

  const handleNextPage = () => {
    if (page + 1 > totalPages) {
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

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious title="Anterior" onClick={handlePrevPage} />
        </PaginationItem>

        {page > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && totalPages > 1 && (
          <PaginationItem>
            <PaginationLink>{page - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink className="text-primary">{page}</PaginationLink>
        </PaginationItem>

        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              className={page + 1 > totalPages ? "text-accent" : ""}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page <= totalPages && totalPages > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
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
