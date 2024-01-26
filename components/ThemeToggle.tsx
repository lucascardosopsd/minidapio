"use client";
import { SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MoonIcon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border-none bg-background border-red h-9">
        <TabsTrigger
          value="light"
          onClick={() => setTheme("light")}
          className="rounded-full"
        >
          <SunIcon className={`h-[1rem] w-[1rem]`} />
        </TabsTrigger>

        <TabsTrigger
          value="dark"
          onClick={() => setTheme("dark")}
          className="rounded-full"
        >
          <MoonIcon className={`h-[1rem] w-[1rem] `} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
