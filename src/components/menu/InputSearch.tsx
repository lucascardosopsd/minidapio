"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CSSProperties, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface MenuInputSearchProps {
  keyName: string;
  placeholder: string;
  triggerClassName?: string;
  triggerStyles?: CSSProperties;
  inputClassName?: string;
  inputStyles?: CSSProperties;
}

const MenuInputSearch = ({
  keyName,
  placeholder,
  triggerClassName,
  triggerStyles,
  inputClassName,
  inputStyles,
}: MenuInputSearchProps) => {
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
    <div className="p-5">
      <div className="flex flex-1 justify-end w-full">
        <Input
          className={cn(
            "w-full placeholder:text-muted-foreground rounded-r-none border-r-0 shadow-md",
            inputClassName
          )}
          style={inputStyles}
          placeholder={searchParams.get(keyName) || placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && handleSearch()}
        />
        <Button
          size="icon"
          onClick={handleSearch}
          className={cn(
            "border-l-0 rounded-l-none text-muted-foreground text-lg shadow-md",
            triggerClassName
          )}
          style={triggerStyles}
          variant="outline"
        >
          <Search size={24} />
        </Button>
      </div>
    </div>
  );
};

export default MenuInputSearch;
