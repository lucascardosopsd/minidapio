"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/lib/utils";

interface PaginateProps {
  current: number;
  pages: number;
}

const Paginate = ({ pages }: PaginateProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const paramsPage = Number(params.get("page"));

  const handleNext = () => {
    if (Number(paramsPage) <= pages) {
      params.set("page", String(paramsPage + 1));

      replace(`${pathname}?${params.toString()}`);

      return;
    }

    return;
  };

  const handlePrev = () => {
    if (Number(paramsPage) <= pages && Number(paramsPage) > 1) {
      params.set("page", String(paramsPage - 1));

      replace(`${pathname}?${params.toString()}`);

      return;
    }

    return;
  };

  const handleSetPage = (index: number) => {
    if (paramsPage && paramsPage <= pages) {
      params.set("page", String(index));

      replace(`${pathname}?${params.toString()}`);

      return;
    }

    return;
  };

  return (
    <Pagination className="py-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrev}
            className={cn("cursor-pointer", paramsPage == 1 && "text-muted")}
          />
        </PaginationItem>
        {Array.from(Array(pages)).map((_, index) => (
          <PaginationItem
            className={cn(
              "cursor-pointer",
              Number(paramsPage) == index + 1 && "text-primary"
            )}
            onClick={() => handleSetPage(index + 1)}
            key={index}
          >
            <PaginationLink>{index + 1}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          className={cn("cursor-pointer", paramsPage == pages && "text-muted")}
        >
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;
