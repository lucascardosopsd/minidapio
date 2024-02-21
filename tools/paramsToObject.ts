"use client";

import { useSearchParams } from "next/navigation";

export const paramsToObject = () => {
  const searchParams = useSearchParams();
  const obj: { [key: string]: string } = {};

  searchParams.forEach((value, key) => (obj[key] = value));

  return obj;
};
