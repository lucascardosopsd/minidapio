"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";

interface ItemProps {
  label: string;
  value: string;
}

interface ReusableCommandProps {
  items: ItemProps[];
  title?: string;
  queryTitle: string;
}

type Status = {
  value: string;
  label: string;
};

const ReusableComboSearch = ({
  items,
  title,
  queryTitle,
}: ReusableCommandProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const setAdvertiserQuery = ({ value }: { value: string }) => {
    if (value) {
      params.set(queryTitle, value);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set(queryTitle, "");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex items-center space-x-4 flex-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <div className="text-clip">{title}</div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(value) => {
                      setAdvertiserQuery({ value });
                      setSelectedStatus(
                        items.find((item) => item.value === value) || null
                      );
                      setOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ReusableComboSearch;
