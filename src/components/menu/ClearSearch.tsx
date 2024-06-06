"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface ClearParamsProps {
  keys: string[];
}

const ClearSearch = ({ keys }: ClearParamsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const handleClearParams = () => {
    keys.forEach((key) => {
      params.delete(key);
    });

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Button
      className="w-full rounded-none"
      variant="outline"
      onClick={handleClearParams}
    >
      Limpar pesquisa
    </Button>
  );
};

export default ClearSearch;
