"use client";
import { Button } from "../ui/button";

const ActionBar = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <p className="text-2xl">Anúncios</p>
      <div className="flex gap-4">
        <Button>Novo Anúncio</Button>
      </div>
    </div>
  );
};

export default ActionBar;
