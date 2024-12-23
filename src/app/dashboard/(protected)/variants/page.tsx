import NewVariantButton from "@/components/restaurant/buttons/NewVariantButton";

const VariantsPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 border-b mt-10 pb-5 ">
        <p className="text-3xl w-full font-semibold">Variações</p>

        <NewVariantButton />
      </div>
    </div>
  );
};

export default VariantsPage;
