"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchFieldProps{
  keyName: string
  placeholder: string
}

const SearchField = ({keyName, placeholder}:SearchFieldProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const [query, setQuery] = useState("");
  const { replace } = useRouter();

  const handleSearch = () => {
    if (query) {
      params.set(keyName, query);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set(keyName, "");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex gap-5 flex-1 justify-end">
      <Input
        className="max-w-[300px]"
        placeholder={searchParams.get(keyName) || placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key == "Enter" && handleSearch()}
      />
      <Button size="icon" onClick={handleSearch}>
        <MagnifyingGlassIcon />
      </Button>
    </div>
  );
};

export default SearchField;
