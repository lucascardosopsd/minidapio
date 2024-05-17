import { Button } from "@/components/ui/button";

const RegionsPage = () => {
  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <p className="text-2xl">Regiões</p>
        <div className="flex gap-4">
          <Button>Nova Região</Button>
        </div>
      </div>
    </section>
  );
};

export default RegionsPage;
