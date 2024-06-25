"use client";
import SearchField from "@/components/misc/SearchField";
import { User } from "@prisma/client";

const AfiliateRelationsActionBar = ({ user }: { user: User }) => {
  return (
    <div className="flex justify-between w-full gap-5 items-center">
      <p className="text-2xl">Anunciantes de {user.name}</p>
      <SearchField
        keyName="name"
        placeholder="Busque um nome"
        inputClassName="w-64"
      />
    </div>
  );
};

export default AfiliateRelationsActionBar;
