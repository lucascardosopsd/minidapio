"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CSSProperties, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  keyName: string;
  placeholder: string;
  triggerClassName?: string;
  triggerStyles?: CSSProperties;
}

const SearchField = ({
  keyName,
  placeholder,
  triggerClassName,
  triggerStyles,
}: SearchFieldProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const [query, setQuery] = useState("");

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
    <div className="flex gap-5 flex-1 justify-end w-full">
      <Input
        className="w-full placeholder:text-muted"
        placeholder={searchParams.get(keyName) || placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key == "Enter" && handleSearch()}
      />
      <Button
        size="icon"
        onClick={handleSearch}
        className={cn("", triggerClassName)}
        style={triggerStyles}
      >
        <MagnifyingGlassIcon />
      </Button>
    </div>
  );
};

export default SearchField;
