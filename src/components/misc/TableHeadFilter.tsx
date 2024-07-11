"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TableHead } from "../ui/table";
import { ReactNode } from "react";
import { ListFilter } from "lucide-react";

interface TableHeadFilterProps {
  queryKey: string;
  value: string;
  children: ReactNode;
}

const TableHeadOrder = ({
  queryKey,
  value,
  children,
}: TableHeadFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const handleOrder = () => {
    params.set(queryKey, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <TableHead onClick={handleOrder}>
      <p className="flex gap-2 cursor-pointer">
        {children} <ListFilter />
      </p>
    </TableHead>
  );
};

export default TableHeadOrder;
