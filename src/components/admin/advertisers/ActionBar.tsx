"use client";
import SearchField from "@/components/misc/SearchField";

const AdvertiserActionBar = () => {
  return (
    <div className="flex justify-between w-full gap-5 items-center">
      <p className="text-2xl">Anunciantes</p>
      <SearchField
        keyName="name"
        placeholder="Busque um nome"
        inputClassName="w-64"
      />
    </div>
  );
};

export default AdvertiserActionBar;
