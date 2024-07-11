"use client";
import ReusableComboSearch from "@/components/misc/ReusableComboSearch";
import SearchField from "@/components/misc/SearchField";

const AdvertiserActionBar = () => {
  const commandOptions = [
    {
      label: "Todos",
      value: "",
    },
    {
      label: "Em dia",
      value: "paid",
    },
    {
      label: "Atrasado",
      value: "unpaid",
    },
  ];

  return (
    <div className="flex justify-between w-full gap-5 items-center">
      <p className="text-2xl">Anunciantes</p>
      <ReusableComboSearch
        items={commandOptions}
        title="Filtrar pagamento"
        queryTitle="payment"
      />

      <SearchField
        keyName="name"
        placeholder="Busque um nome"
        inputClassName="w-64"
      />
    </div>
  );
};

export default AdvertiserActionBar;
