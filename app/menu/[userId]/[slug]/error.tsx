"use client";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const ErrorPage = (error: { error: Error }) => {
  useEffect(() => {}, [error]);

  return (
    <div className="flex w-full h-[calc(100svh-70px)] flex-col items-center justify-center gap-2">
      <Badge variant="destructive">Erro</Badge>
      <h3>Algo deu errado</h3>
    </div>
  );
};

export default ErrorPage;
